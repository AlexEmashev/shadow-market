import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserSettingsService } from '../../shared/user-settings.service';
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

  /**
   * Key press handler, for login-password fields, to check Enter hit.
   * @param keyCode scan keycode for Enter press
   */
  onKeyPress(keyCode: number) {
    if (keyCode === 13) {
      this.login(this.login_str, this.password_str);
    }
  }

  /**
   * Logs in to app using credentials.
   * @param login users's login
   * @param password user's password
   */
  login(login, password): void {
    this.userSettings.login(login, password)
      .subscribe(user => {
        if (user) {
          this.userSettings.authrizeUser(user).subscribe((result: boolean) => {
            console.log('User authorized:', user);
            this.showUserNotFound = false;
            this.dialogRef.close();
          });
        } else {
          this.showUserNotFound = true;
        }
      });
  }



}
