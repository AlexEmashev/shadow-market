import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../../shared/catalog-item';
import { CatalogService } from '../../shared/catalog.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  catalog: CatalogItem[];

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getCatalogItems();
  }

  /**
   * Returns catalog items.
   */
  getCatalogItems(): void {
    this.catalogService.getItems()
      .subscribe(items => this.catalog = items);
  }

}
