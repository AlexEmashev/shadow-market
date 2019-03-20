import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogItem } from '../../../shared/catalog-item';
import { CatalogService } from '../../../shared/catalog.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BuyDialogComponent } from '../../../components/buy-dialog/buy-dialog.component';
import { UserLoginComponent } from '../../../components/user-login/user-login.component';
import { UserSettingsService } from '../../../shared/user-settings.service';
import { AppRoles } from '../../../shared/user-settings';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, AfterViewInit {
  /**
   * Catalog item.
   */
  item: CatalogItem;
  userName: string;

  /**
   * Native HTML element of photo slider.
   */
  @ViewChild('itemPhotos') photosElem: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userSettings: UserSettingsService,
    private catalogService: CatalogService,
    private loginDialog: MatDialog,
    private buyDialog: MatDialog
  ) {  }

  ngOnInit() {
    // Get item using item id.
    const itemId = +this.route.snapshot.paramMap.get('id');
    this.catalogService.getItem(itemId)
      .subscribe((item) => {
        this.item = item;
        this.userName = this.userSettings.name;
      });
  }

  ngAfterViewInit(): void {
    //$('#photos').swipeslider();
  }

  /**
   * Shows buy dialog.
   * @param item CatalogItem
   */
  buyItem(item): void {
    this.buyDialog.open(BuyDialogComponent, {
      data: item,
      maxWidth: '640px',
      maxHeight: '300px'
    });
  }

  /**
   * Returns to Catalog.
   */
  cancelClick(): void {
    this.location.back();
  }

}
