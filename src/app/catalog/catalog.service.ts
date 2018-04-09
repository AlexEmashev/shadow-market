import { Injectable } from '@angular/core';
import { CatalogItem } from './catalog-item';
import { CATALOG } from './mock-catalog-items';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

/**
 * Service to work with catalog items.
 */
@Injectable()
export class CatalogService {

  constructor() { }

  /**
   * Returns array of catalog items.
   */
  getItems(): Observable<CatalogItem[]> {
    return of(CATALOG);
  }

  /**
   * Returns items belonging current user.
   */
  getItemsByUserID(userId: number): Observable<CatalogItem> {
    return from(CATALOG).pipe(filter(catalogItem => catalogItem.user_id === userId));
  }

  /**
   * Returns catalog item by id.
   */
  getItem(id: number): Observable<CatalogItem> {
    return from(CATALOG).pipe(filter(item => item.id === id));
  }

  /**
   * Detele selected item (either by Id or itemm itself).
   */
  deleteItem(catalogItem: CatalogItem, userId: number): Observable<CatalogItem> {
    // ToDo: Actually remove an item from BD.
    return of(catalogItem);
  }

}
