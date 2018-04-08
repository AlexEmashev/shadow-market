import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { CatalogService } from '../catalog.service';
import { UserSettingsService } from '../../user-settings.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {
  @Input() catalogItem: CatalogItem;
  @Input() editMode: boolean;
  @Output() onDeleteClick: EventEmitter<CatalogItem> = new EventEmitter();
  @Output() onEditClick: EventEmitter<CatalogItem> = new EventEmitter();

  constructor(private catalogService: CatalogService,
    private userSettings: UserSettingsService,
    public confirmDeleteDialog: MatDialog) {
    }


  ngOnInit() {
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
   * Emits item deleting on parent
   */
  deleteItem(): void {
    this.onDeleteClick.emit(this.catalogItem);
  }

  /**
   * Emits item editing on parent
   */
  editItem(): void {
    this.onEditClick.emit(this.catalogItem);
  }

}
