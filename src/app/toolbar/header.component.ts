import { Component, OnInit, HostListener } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { UserSettingsService } from '../user-settings.service';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuBreakpoint = 480;
  menuShown = true;
  currentTheme = '';

  constructor(private toolbar: ToolbarService,
    public userSettings: UserSettingsService,
    private loginDialog: MatDialog,
    private registerDialog: MatDialog,
    private themeService: ThemeService
  ) {
    this.themeService.currentTheme.subscribe(theme => this.currentTheme = theme);
   }

  ngOnInit() {
    this.setupMenuVisibility();
  }

  /**
   * Setup menu when window resizing.
   */
  @HostListener('window:resize') onResize() {
    this.setupMenuVisibility();
  }

  /**
   * Setups menu visibility to improve UX.
   */
  setupMenuVisibility() {
    if (window.innerWidth > this.menuBreakpoint) {
      this.menuShown = true;
    } else {
      this.menuShown = false;
    }
  }

  toggleMenu() {
    // this.menuShown = !this.menuShown;
    this.menuShown ? this.hideMenu() : this.showMenu();
  }

  showMenu() {
    this.menuShown = true;
  }

  hideMenu() {
    this.menuShown = false;
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
    this.userSettings.logOut();
    window.location.assign(''); // We need to reload window to apply changes.
  }

  switchTheme(theme: string) {
    this.themeService.changeTheme(theme);
  }
}
