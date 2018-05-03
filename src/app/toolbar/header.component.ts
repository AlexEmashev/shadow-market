import { Component, OnInit, HostListener } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { UserSettingsService } from '../user-settings.service';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private toolbar: ToolbarService,
    public userSettings: UserSettingsService,
    private loginDialog: MatDialog
  ) { }
  menuBreakpoint = 480; // ToDo: make actual contract of break point corresponding style
  menuShown = true;

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
   * Setups menu visibility to increase ux.
   */
  setupMenuVisibility() {
    if (window.innerWidth > this.menuBreakpoint) {
      this.menuShown = true;
    } else {
      this.menuShown = false;
    }
  }

  toggleMenu() {
    this.menuShown = !this.menuShown;
  }

  showMenus() {
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

  logOut() {
    this.userSettings.logOut();
    window.location.assign(''); // We need to reload window to apply changes.
  }
}
