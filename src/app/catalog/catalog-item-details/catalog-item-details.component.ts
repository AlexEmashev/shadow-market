import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserSettingsService } from '../../user-settings.service';

@Component({
  selector: 'app-catalog-item-details',
  templateUrl: './catalog-item-details.component.html',
  styleUrls: ['./catalog-item-details.component.scss']
})
export class CatalogItemDetailsComponent implements OnInit {
  /**
   * Catalog item.
   */
  item: CatalogItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userSettings: UserSettingsService,
    private catalogService: CatalogService
  ) {
    this.item = {
      id: null,
      user_id: null,
      title: null,
      description: null,
      photos: [],
      price: null,
      likes: 0,
      views: 0
    };
  }

  ngOnInit() {
    // Get item using item id.
    const itemId = +this.route.snapshot.paramMap.get('id')
    this.catalogService.getItem(itemId)
      .subscribe((item) => this.item = item);
  }

}
