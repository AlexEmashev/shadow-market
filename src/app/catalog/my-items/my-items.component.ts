import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { UserSettingsService } from '../../user-settings.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss']
})
export class MyItemsComponent implements OnInit {
  catalog: CatalogItem[];

  constructor(private catalogService: CatalogService,
              private userSettings: UserSettingsService) {
    this.catalog = [];
  }

  ngOnInit() {
    this.getCatalogItems();
  }

  /**
   * Returns items of current user.
   */
  getCatalogItems(): void {
    this.catalogService.getItemsByID(this.userSettings.id)
      .subscribe(item => this.catalog.push(item));
  }

}
