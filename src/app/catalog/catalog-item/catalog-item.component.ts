import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private catalogService: CatalogService,
    private userSettings: UserSettingsService,
    public confirmDeleteDialog: MatDialog) { }

  ngOnInit() {
  }

  /**
   * Opens delete confirmation dialog.
   */
  openConfirmDeleteDialog(): void {
    console.log('Delete clicked');
    const dialogRef = this.confirmDeleteDialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem();
      }
      console.log('Result is ', result);
    });
  }

  deleteItem(): void {

    this.catalogService.deleteItem(this.catalogItem.id, this.userSettings.id).subscribe(x => console.log(x));
  }

}
