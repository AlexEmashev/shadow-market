import { Injectable } from '@angular/core';
import { CatalogItem } from './catalog-item';
import { CATALOG } from './mock-catalog-items';
import { Observable } from 'rxjs/Observable';
import { filter, max, map, defaultIfEmpty } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { ImageState } from './images-edit/image_element';
import { UserSettingsService } from '../user-settings.service';
import { AppRoles } from '../user-settings';

/**
 * Service to work with catalog items.
 */
@Injectable()
export class CatalogService {
  /**
   * Local catalog items storage.
   */
  catalog: CatalogItem[];

  constructor(
    private userSettings: UserSettingsService
  ) {
    this.catalog = [];
    this.loadDB();
   }

   /**
    * Loads DB from LocalStorage if possible, if no, loads mock data.
    * @returns true if data loaded from LocalStoarage.
    */
   private loadDB(): boolean {
    if (localStorage.getItem('db') === null) {
      CATALOG.map(item => this.catalog.push(item));
      this.saveDBLocaly();
      return false;
    } else {
      this.catalog = JSON.parse(localStorage.getItem('db'));
      return true;
    }
   }

   /**
    * Increase views of item by id.
    * @param id: item id.
    */
   public bumpView(id: number): void {
     this.catalog.map((item: CatalogItem, index: number, ary: CatalogItem[]) => {
      if (item.id === id) {
        item.views += 1;
      }
     });

    this.saveDBLocaly();
   }

   /**
    * Increase likes.
    * @param id  item id.
    */
   public like(id: number): void {
    if ( this.userSettings.role === AppRoles.guest ) { return ; }

    this.catalog.map((item: CatalogItem, index: number, ary: CatalogItem[]) => {
      if (item.id === id && item.likes.indexOf(this.userSettings.name) === -1) {
        item.likes.push(this.userSettings.name);
      } else if (item.id === id) {
        item.likes.splice(item.likes.indexOf(this.userSettings.name), 1);
      }
     });

    this.saveDBLocaly();
   }

   /**
    * Saves DB in LocalStorage.
    */
   private saveDBLocaly(): void {
     localStorage.setItem('db', JSON.stringify(this.catalog));
   }

   /**
    * Clears LocalStorage.
    */
   public clearDB(): void {
     localStorage.removeItem('db');
   }

  /**
   * Returns array of catalog items.
   */
  getItems(): Observable<CatalogItem[]> {
    return of(this.catalog);
  }

  /**
   * Returns items belonging current user.
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
      this.saveDBLocaly();
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
        this.saveDBLocaly();
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
        this.saveDBLocaly();
        return true;
      }),
      defaultIfEmpty(false)
    );
  }

}
