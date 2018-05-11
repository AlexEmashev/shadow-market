import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../../shared/catalog-item';
import { CatalogService } from '../../shared/catalog.service';
import { UserSettingsService } from '../../shared/user-settings.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  catalog: CatalogItem[];

  constructor(private catalogService: CatalogService,
    private userSettings: UserSettingsService
  ) { }

  ngOnInit() {
    this.getCatalogItems();
  }

  /**
   * Returns catalog items.
   */
  getCatalogItems(): void {
    console.log('Get catalog');
    this.catalogService.getItems()
      .subscribe(items => this.catalog = items);
  }

}
