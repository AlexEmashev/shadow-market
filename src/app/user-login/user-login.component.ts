import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserSettingsService } from '../user-settings.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  login_str: string;
  password_str: string;
  showUserNotFound: boolean;
  placeholderLogin: string;
  placeholderPassword: string;

  constructor(
    public dialogRef: MatDialogRef<UserLoginComponent>,
    private userSettings: UserSettingsService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.showUserNotFound = false;
      translate.get('loginForm.login_input').subscribe((res: string) => this.placeholderLogin = res);
      translate.get('loginForm.password_input').subscribe((res: string) => this.placeholderPassword = res);
     }

  ngOnInit() {
  }

  login(login, password): void {
    console.log(login, password);
    this.userSettings.login(login, password)
      .subscribe(item => {
        if (item) {
          this.userSettings.authrizeUser(item);
          this.showUserNotFound = false;
          this.dialogRef.close();
          window.location.assign(''); // We need to reload window to apply changes.
        } else {
          this.showUserNotFound = true;
        }
      });
  }



}
