import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogItem } from '../../../shared/catalog-item';
import { CatalogService } from '../../../shared/catalog.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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
  liked = false;
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
      this.userSettings.getUserSettings().subscribe(user => {
        this.liked = this.checkLiked(user.name);
      });
  }

  /**
   * Returns true if item liked by user.
   * @param userName username.
   */
  private checkLiked(userName: string): boolean {
    if (this.item.likes.indexOf(userName) >= 0)  {
      return true;
    } else {
      return false;
    }
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
      this.catalogService.like(this.item.id).subscribe(
        result => {
          // If result "1" - item liked, "-1" - item unliked, "0" - like count unchanged.
          if (result > 0) {
            this.liked = true;
          } else if (result < 0) {
            this.liked = false;
          }
        });
    }
  }

  /**
   * Returns to Catalog.
   */
  cancelClick(): void {
    this.location.back();
  }

}
