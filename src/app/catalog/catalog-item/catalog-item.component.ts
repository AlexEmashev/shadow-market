import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { CatalogService } from '../catalog.service';
import { UserSettingsService } from '../../user-settings.service';
import { BuyDialogComponent } from '../../buy-dialog/buy-dialog.component';
import { AppRoles } from '../../user-settings';
import { UserLoginComponent } from '../../user-login/user-login.component';


@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit, AfterViewInit {
  @Input() catalogItem: CatalogItem;
  @Input() editMode: boolean;
  @Output() deleteClick: EventEmitter<CatalogItem> = new EventEmitter();
  @Output() editClick: EventEmitter<CatalogItem> = new EventEmitter();

  userName: string;

  constructor(private catalogService: CatalogService,
    private cdRef: ChangeDetectorRef,
    private userSettings: UserSettingsService,
    private buyDialog: MatDialog,
    private loginDialog: MatDialog,
    public confirmDeleteDialog: MatDialog) {
      this.userName = this.userSettings.name;
    }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.catalogService.bumpView(this.catalogItem.id);
    // Wee need to update changes manually after modifying the model.
    this.cdRef.detectChanges();
  }

  /**
   * Opens delete confirmation dialog.
   */
  openConfirmDeleteDialog(): void {
    const dialogRef = this.confirmDeleteDialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem();
      }
    });
  }

  /**
   * Like an item.
   */
  like(): void {
    if (this.userSettings.role === AppRoles.guest) {
      this.loginDialog.open(UserLoginComponent, {
        width: '250px',
        height: 'auto'
      });
    } else {
      this.catalogService.like(this.catalogItem.id);
    }
  }

  /**
   * Emits item deleting on parent
   */
  deleteItem(): void {
    this.deleteClick.emit(this.catalogItem);
  }

  /**
   * Emits item editing on parent
   */
  editItem(): void {
    this.editClick.emit(this.catalogItem);
  }

  buyItem(): void {
    this.buyDialog.open(BuyDialogComponent, {
      data: this.catalogItem,
      maxWidth: '640px',
      maxHeight: '300px'
    });
  }

}
