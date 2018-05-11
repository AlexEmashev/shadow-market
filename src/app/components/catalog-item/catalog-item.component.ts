import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CatalogItem } from '../../shared/catalog-item';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CatalogService } from '../../shared/catalog.service';
import { UserSettingsService } from '../../shared/user-settings.service';
import { BuyDialogComponent } from '../buy-dialog/buy-dialog.component';
import { AppRoles } from '../../shared/user-settings';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {
  @Input() catalogItem: CatalogItem;
  @Input() editMode: boolean;
  @Output() deleteClick: EventEmitter<CatalogItem> = new EventEmitter();
  @Output() editClick: EventEmitter<CatalogItem> = new EventEmitter();

  userName: string;

  constructor(private catalogService: CatalogService,
    private userSettings: UserSettingsService,
    private buyDialog: MatDialog,
    private loginDialog: MatDialog,
    public confirmDeleteDialog: MatDialog) {
      this.userName = this.userSettings.name;
    }


  ngOnInit() {
    this.userSettings.getUserSettings().subscribe(user => {
    });
  }

  /**
   * Opens delete confirmation dialog.
   */
  openConfirmDeleteDialog(): void {
    const dialogRef = this.confirmDeleteDialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteItem();
      }
    });
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
