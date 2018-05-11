import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderService } from './header.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { UserSettingsService } from '../../shared/user-settings.service';
import { ThemeService } from '../../shared/theme.service';
import { LocaleService } from '../../shared/locale.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentTheme: string;
  currentLocale: string;

  constructor(private toolbar: HeaderService,
    public userSettings: UserSettingsService,
    private loginDialog: MatDialog,
    private registerDialog: MatDialog,
    private translate: TranslateService,
    private themeService: ThemeService,
    private localeService: LocaleService
  ) {
    this.localeService.localeTheme.subscribe(locale => this.currentLocale = locale);
    this.themeService.currentTheme.subscribe(theme => this.currentTheme = theme);
   }

  ngOnInit() {
    this.currentLocale = this.translate.defaultLang;
  }

  /**
   * Setup menu when window resizing.
   */
  @HostListener('window:resize') onResize() {
  }

  /**
  * Toggles sidenav menu
  */
  toggeSidenav() {
    this.toolbar.changeMessage('toggleSidenav');
  }

  /**
   * Opens user login dialog
   */
  openLoginDialog() {
    this.loginDialog.open(UserLoginComponent, {
      width: '250px',
      height: 'auto'
    });
  }

  /**
   * Opens user register dialog
   */
  openRegisterDialog() {
    this.registerDialog.open(RegisterDialogComponent, {
      width: '260px',
      height: 'auto'
    });
  }

  logOut() {
    this.userSettings.logOut().subscribe(user => {
    });
  }

  switchTheme(theme: string) {
    this.themeService.changeTheme(theme);
  }

  /**
   * Switches app locale.
   * @param locale locale string e.g. "en", "ru".
   */
  switchLocale(locale: string) {
    this.localeService.changeLocale(locale);
  }
}
