import { Injectable } from '@angular/core';
import { CatalogItem } from './catalog-item';
import { CATALOG } from './mock-catalog-items';
import { Observable } from 'rxjs/Observable';
import { filter, max, map, defaultIfEmpty } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { ImageState } from './image_element';
import { UserSettingsService } from './user-settings.service';
import { AppRoles } from './user-settings';
import { DBService } from '../shared/db.service';

/**
 * Service to work with catalog items.
 */
@Injectable()
export class CatalogService {
  /**
   * Local catalog items storage.
   */
  catalog: CatalogItem[] = [];
  private dbKey = 'catalog';

  constructor(
    private userSettings: UserSettingsService,
    private dbService: DBService
  ) {
    this.catalog = this.dbService.loadData(this.dbKey, CATALOG);
  }

   /**
    * Increase views of item by id.
    * @param id: item id.
    */
   public bumpView(id: number): Observable<CatalogItem> {
     return from(this.catalog).pipe(
       map((item: CatalogItem) => {
         if (item.id === id) {
           item.views += 1;
         }
         this.dbService.saveData(this.dbKey, this.catalog);
         return item;
       })
     );
   }

   /**
    * Increase likes.
    * @param id  item id.
    * @returns Observable of like 1 - liked, -1 disliked, 0 - can't set like because of guest role.
    */
   public like(id: number): Observable<number> {
    if ( this.userSettings.role === AppRoles.guest ) { return of(0) ; }

    return from(this.catalog).pipe(
      filter((item: CatalogItem) => item.id === id),
      map((item: CatalogItem) => {
        if (item.id === id && item.likes.indexOf(this.userSettings.name) === -1) {
          item.likes.push(this.userSettings.name);
          return 1;
        } else if (item.id === id) {
          item.likes.splice(item.likes.indexOf(this.userSettings.name), 1);
          return -1;
        }
        this.dbService.saveData(this.dbKey, this.catalog);
      })
    );
   }

   /**
    * Clears LocalStorage.
    */
   clearDB(): void {
     localStorage.removeItem('db');
   }

  /**
   * Returns array of catalog items.
   */
  getItems(): Observable<CatalogItem[]> {
    return of(this.catalog);
  }

  /**
   * Returns items of the current user.
   */
  getItemsByUserID(userId: number): Observable<CatalogItem> {
    return from(this.catalog).pipe(filter(catalogItem => catalogItem.user_id === userId));
  }

  /**
   * Returns catalog item, only if item is  owner is current user.
   */
  getItemByUserID(itemID: number, userId: number): Observable<CatalogItem> {
    return from(this.catalog).pipe(
      filter(item => (item.user_id === userId) && (item.id === itemID)));
  }

  /**
   * Returns catalog item by id.
   */
  getItem(id: number): Observable<CatalogItem> {
    return from(this.catalog).pipe(filter(item => item.id === id));
  }

  /**
   * Detele selected item (either by Id or itemm itself).
   */
  deleteItem(catalogItem: CatalogItem, userId: number): Observable<boolean> {
    const removeIndex = this.catalog.findIndex((element: CatalogItem, index, array) => {
      if (element.id === catalogItem.id && element.user_id === userId) {
        return true;
      }
    });
    if (removeIndex >= 0) {
      this.catalog.splice(removeIndex, 1);
      this.dbService.saveData(this.dbKey, this.catalog);
      return of(true);
    } else {
      return of(false);
    }
  }

  /**
   * Pushes catalog item to the collection.
   * @param catalogItem New catalog item.
   * @returns id of a new item
   */
  putItem(catalogItem: CatalogItem): Observable<number> {
    return from(this.catalog).pipe(
      max((x: CatalogItem, y: CatalogItem) => x.id - y.id),
      map((item: CatalogItem) => {
        catalogItem.id = item.id + 1;
        return catalogItem;
      }),
      map((item: CatalogItem) => {
        this.catalog.push(item);
        this.dbService.saveData(this.dbKey, this.catalog);
        return item.id;
      })
    );
  }

  /**
   * Updates catalog item.
   * @param catalogItem catalog item to update.
   * @returns returns true if everything is fine.
   */
  updateItem(catalogItem: CatalogItem): Observable<boolean> {
    return from(this.catalog).pipe(
      filter((item: CatalogItem) => item.id === catalogItem.id),
      map((item: CatalogItem) => {
        item.description = catalogItem.description;
        const filteredItems = catalogItem.photos.filter((photo) =>  photo.state !== ImageState.deleted );
        item.photos = filteredItems;
        item.price = catalogItem.price;
        item.title = catalogItem.title;
        this.dbService.saveData(this.dbKey, this.catalog);
        return true;
      }),
      defaultIfEmpty(false)
    );
  }

}
