import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { UserSettingsService } from '../../user-settings.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss']
})
export class MyItemsComponent implements OnInit {
  catalog: CatalogItem[];

  constructor(private catalogService: CatalogService,
              private userSettings: UserSettingsService,
              private router: Router) {
    this.catalog = [];
  }

  ngOnInit() {
    this.getCatalogItems();
  }

  /**
   * Returns items of current user.
   */
  getCatalogItems(): void {
    this.catalogService.getItemsByUserID(this.userSettings.id)
      .subscribe(item => this.catalog.push(item));
  }

  /**
   * Redirects to the form of new item creation.
   */
  addNewItem(): void {
    //"my-items/create"
    this.router.navigate([this.router.url, 'create']);
  }

  /**
   * Removes item from the collection.
   */
  deleteItem(item: CatalogItem) {
    this.catalogService.deleteItem(item, this.userSettings.id)
    .subscribe( item => {
      let delete_id: number = this.catalog.indexOf(item);
      if (delete_id > -1) {
        this.catalog.splice(delete_id, 1);
      }
    });
  }

  /**
   * Navigates to edit item page.
   */
  editItem(item: CatalogItem) {
    this.router.navigate([this.router.url, item.id]);
  }
}
