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
  getItemsByID(userId: number): Observable<CatalogItem> {
    return from(CATALOG).pipe(filter(catalogItem => catalogItem.user_id === userId));
  }

  /**
   * Detele selected item (either by Id or itemm itself).
   */
  deleteItem(catalotItem: CatalogItem|number, userId: number): Observable<CatalogItem> {
    const itemId = typeof catalotItem === 'number' ? catalotItem : catalotItem.id;

    return from(CATALOG).pipe(filter((item) => (item.id !== itemId) && (item.user_id !== userId)));
  }

}
