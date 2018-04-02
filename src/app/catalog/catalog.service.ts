import { Injectable } from '@angular/core';
import { CatalogItem } from './catalog-item';
import { CATALOG } from './mock-catalog-items';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

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

}
