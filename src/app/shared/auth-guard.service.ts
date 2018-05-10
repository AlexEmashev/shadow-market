import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserSettingsService } from './user-settings.service';
import { CatalogService } from './catalog.service';
import { Observable } from 'rxjs/Observable';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

/**
 * The class for cheching the authorization of a user and redirecting them
 * if user not allowed to be there.
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private userSettingsService: UserSettingsService,
    private catalogService: CatalogService,
    private router: Router) { }

    /**
     * Checks activated route if route isn't allowed or not found redirects to corresponsing page.
     * @param route activated route
     * @param state state of router
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      const item_id: number = +route.params.id;

      if (route.routeConfig.path === 'catalog/:id') { // Get item by ID, if not exists go to 404
        return this.catalogService.getItem(item_id)
          .pipe(map(item => true),
          defaultIfEmpty(false),
          map(reqResult => {
            if (!reqResult) {
              this.navigateNotfound();
            }
            return reqResult;
          })
        );
      } else if (route.routeConfig.path === 'my-items/:id') { // Get user's item, if not exists not-allowed
        return  this.catalogService.getItemByUserID(item_id, this.userSettingsService.id)
          .pipe(
            map(item => true),
            defaultIfEmpty(false),
            map(reqResult => {
              if (!reqResult) {
                this.navigateNotAllowed();
              }
              return reqResult;
          }));
      } else {
        return of(true);
      }
    }

    /**
     * Navigates to the safe page if not allowed.
     */
    private navigateNotAllowed(): boolean {
      this.router.navigate(['/not-allowed']);
      return false;
    }

    /**
     * Navigates to 404 page
     */
    private navigateNotfound(): boolean {
      this.router.navigate(['/404']);
      return false;
    }
}
