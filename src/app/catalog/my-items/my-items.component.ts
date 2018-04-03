import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {
  catalog: CatalogItem[];

  constructor(private catalogService: CatalogService) {
    this.catalog = [];
  }

  ngOnInit() {
    this.getCatalogItems();
  }

  /**
   * Returns items of current user.
   */
  getCatalogItems(): void {
    this.catalogService.getItemsByID(1)
      .subscribe(item => this.catalog.push(item));
  }

}
