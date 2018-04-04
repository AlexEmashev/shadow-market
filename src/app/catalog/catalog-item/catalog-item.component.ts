import { Component, OnInit, Input } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {
@Input() catalogItem: CatalogItem;
  constructor(public confirmDeleteDialog: MatDialog) { }

  ngOnInit() {
  }

  /**
   * Opens delete confirmation dialog.
   */
  openConfirmDeleteDialog() {
    console.log('Delete clicked');
    const dialogRef = this.confirmDeleteDialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Result is ', result);
    });
  }

}

//
// @Component({
//   selector: 'delete-confirmation-dialog',
//   template: 'Hi!'
// })
// export class DeleteConfirmationComponent {}
