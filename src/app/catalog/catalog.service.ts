import { Injectable } from '@angular/core';
import { CatalogItem } from './catalog-item';
import { CATALOG } from './mock-catalog-items';
import { Observable } from 'rxjs/Observable';
import { filter, max, map, defaultIfEmpty } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { ImageState } from './images-edit/image_element';

/**
 * Service to work with catalog items.
 */
@Injectable()
export class CatalogService {
  /**
   * Local catalog items storage.
   */
  catalog: CatalogItem[];

  constructor() {
    this.catalog = [];
    CATALOG.map(item => this.catalog.push(item));
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
    // ToDo: Actually remove an item from BD.
    const removeIndex = this.catalog.findIndex((element: CatalogItem, index, array) => {
      if (element.id === catalogItem.id && element.user_id === userId) {
        return true;
      }
    });
    if (removeIndex >= 0) {
      this.catalog.splice(removeIndex, 1);
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
        return true;
      }),
      defaultIfEmpty(false)
    );
  }

}
