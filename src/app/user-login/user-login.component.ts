import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  login_str: string
  password_str: string;
  showUserNotFound: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserLoginComponent>,
    private userSettings: UserSettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.showUserNotFound = false;
     }

  ngOnInit() {
  }

  login(login, password) {
    console.log(login, password);
    this.userSettings.login(login, password)
      .subscribe(item => {
        if (item) {
          this.userSettings.authrizeUser(item);
          this.showUserNotFound = false;
          this.dialogRef.close();
        } else {
          this.showUserNotFound = true;
        }
      })
  }



}
