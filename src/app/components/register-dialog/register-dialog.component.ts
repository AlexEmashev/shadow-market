import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from '../../shared/user-settings.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  login: string;
  password: string;
  contact: string;
  placeholderLogin: string;
  placeholderContact: string;
  placeholderPassword: string;
  showUserExist: boolean;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private userSettings: UserSettingsService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.login = '';
    this.password = '';
    this.contact = '';

    this.showUserExist = false;
    translate.get('registerForm.login_input').subscribe((res: string) => this.placeholderLogin = res);
    translate.get('registerForm.contact_input').subscribe((res: string) => this.placeholderContact = res);
    translate.get('registerForm.password_input').subscribe((res: string) => this.placeholderPassword = res);
  }

  ngOnInit() {
  }

    /**
   * Key press handler, for login-password fields, to check Enter hit.
   * @param keyCode scan keycode for Enter press
   */
  onKeyPress(keyCode: number) {
    if (keyCode === 13) {
      this.register(this.login, this.contact, this.password);
    }
  }

  /**
   * Register new user.
   * @param login user's login
   * @param contact user's contact info
   * @param password user's password
   */
  register(login, contact, password): void {
    this.userSettings.register(login, contact, password)
    .subscribe((result: number) => {
      if (result < 0) {
        this.showUserExist = true;
      } else {
        // Login user if registered.
        this.userSettings.login(login, password);
      }
    });
  }

}
