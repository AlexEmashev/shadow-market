import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../../shared/catalog-item';
import { CatalogService } from '../../shared/catalog.service';
import { UserSettingsService } from '../../shared/user-settings.service';
import { Router } from '@angular/router';
import { AppRoles } from '../../shared/user-settings';
import { Store } from '@ngrx/store';
import * as fromReducer from '../../shared/reducers/reducers';


@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss']
})
export class MyItemsComponent implements OnInit {
  catalog: CatalogItem[];
  itemsCount = 0; // Set default to 0, since if user doesn't have lots catalog service won't fire
  constructor(private catalogService: CatalogService,
              public userSettings: UserSettingsService,
              private router: Router,
              private store: Store<fromReducer.State>
            ) {
    this.catalog = [];
  }

  ngOnInit() {
    this.getCatalogItems();
    // When user sign outs redirect them to catalog page.
    this.store.subscribe(state => {
      if (state.user.role === AppRoles.guest) {
        this.router.navigate(['']);
      }
    });
  }

  /**
   * Returns items of current user.
   */
  getCatalogItems(): void {
    this.catalog = [];
    this.catalogService.getItemsByUserID(this.userSettings.id)
      .subscribe(item => {
        this.catalog.push(item);
        this.itemsCount = this.catalog.length;
      });
  }

  /**
   * Redirects to the form of new item creation.
   */
  addNewItem(): void {
    // зфер "my-items/create"
    this.router.navigate([this.router.url, 'create']);
  }

  /**
   * Removes item from the collection.
   */
  deleteItem(item: CatalogItem) {
    this.catalogService.deleteItem(item, this.userSettings.id)
    .subscribe( result => {
      if (result) {
        this.getCatalogItems();
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
