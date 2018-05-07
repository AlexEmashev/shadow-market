import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.scss']
})
export class BuyDialogComponent implements OnInit {
  sellerName: string;
  sellerContact: string;
  itemTitle: string;
  price: number;

  constructor(
    public dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userSettings: UserSettingsService
  ) { }

  ngOnInit() {
    // Get user contact and other info for buy dialog.
    if (this.data.user_id > 0) {
      this.userSettings.getUser(this.data.user_id)
        .subscribe(user => {
          if (user) {
            this.sellerName = user.name;
            this.sellerContact = user.contact;
          }
          });

      this.itemTitle = this.data.title;
      this.price = this.data.price;
    }
  }

}
