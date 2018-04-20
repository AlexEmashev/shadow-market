import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserSettingsService } from './user-settings.service';
import { CatalogService } from './catalog/catalog.service';
import { Observable } from 'rxjs/Observable';
import { map, defaultIfEmpty } from 'rxjs/operators';

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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      const item_id: number = +route.params.id;
      return  this.catalogService.getItemByUserID(item_id, this.userSettingsService.id)
        .pipe(
          map(item => true),
          defaultIfEmpty(false),
          map(result => {
          if (!result) {
            this.navigateNotAllowed();
          }
          return result;
        }));
    }

    /**
     * Navigates to the safe page if not allowed.
     */
    private navigateNotAllowed():boolean {
      this.router.navigate(['/not-allowed']);
      return false;
    }

    /**
     * Navigates to 404 page
     */
    private navigateNotfound(): boolean {
      this.router.navigate(['404'])
      return false;
    }
}
