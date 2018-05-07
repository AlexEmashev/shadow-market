import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserSettingsService } from '../../user-settings.service';
import { BuyDialogComponent } from '../../buy-dialog/buy-dialog.component';
import { AppRoles } from '../../user-settings';
import { UserLoginComponent } from '../../user-login/user-login.component';


@Component({
  selector: 'app-catalog-item-details',
  templateUrl: './catalog-item-details.component.html',
  styleUrls: ['./catalog-item-details.component.scss']
})
export class CatalogItemDetailsComponent implements OnInit, AfterViewInit {
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
        this.userName = this.userSettings.name; // Used for displaying likes button contrast.
      });
  }

  ngAfterViewInit(): void {
    $('#photos').swipeslider();
  }

  buyItem(item): void {
    this.buyDialog.open(BuyDialogComponent, {
      data: item,
      maxWidth: '640px',
      maxHeight: '300px'
    });
  }

  like(): void {
    if (this.userSettings.role === AppRoles.guest) {
      this.loginDialog.open(UserLoginComponent, {
        width: '250px',
        height: 'auto'
      });
    } else {
      this.catalogService.like(this.item.id);
    }
  }

  /**
   * Returns to Catalog.
   */
  cancelClick(): void {
    this.location.back();
  }

}
