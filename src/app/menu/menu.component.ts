import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { UserSettingsService } from '../user-settings.service';
import { AppRoles, AppThemes, UserSettings } from '../user-settings';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  /**
   * Breakpoint fPor Sidenav displaying mode.
   */
  menuBreakpoing = 720;
  /**
   * Depicts menu steate.
   */
  menuOpened = false;

  /**
  * Get access to sidenav component on view.
  */
  @ViewChild('mainSidenav')
  mainSidenav: MatSidenav;

  /**
   * Add event listenet on window resize.
   */
  @HostListener('window:resize') onResize() {
    this.switchSidenavMode();
  }


  constructor(private toolbar: ToolbarService, 
    public userSettings: UserSettingsService) { }

  ngOnInit() {
    // Subscribe to the observable and connect it to a message.
    this.toolbar.currentMessage.subscribe(message => this.onToolbarStateChanged(message));
    if (window.innerWidth > this.menuBreakpoing) {
      this.menuOpened = true;
    }
    this.switchSidenavMode();
  }

  /**
  * Get access to a component view.
  */
  ngAfterViewInit() {
  }

  /**
  * Subscribe on event on toolbar changing.
  */
  onToolbarStateChanged(message) {
    switch (message) {
      case 'toggleSidenav':
        if (window.innerWidth > this.menuBreakpoing && this.menuOpened) {
          this.menuOpened = false;
        } else if (window.innerWidth > this.menuBreakpoing && !this.menuOpened) {
          this.menuOpened = true;
        }
        this.mainSidenav.toggle();
        break;
    }
  }

  /**
   * Clicking menu item handler.
   */
  onMenuItemClick() {
    if (window.innerWidth < this.menuBreakpoing) {
      this.mainSidenav.close();
    }
  }

  /**
   * Switches Sidenav mode depending on the screen width.
   */
  switchSidenavMode() {
    const width = window.innerWidth;

    if (width > this.menuBreakpoing) {
      if (this.menuOpened) {
        this.mainSidenav.open();
      } else {
        this.mainSidenav.close();
      }
      this.mainSidenav.mode = 'side';
    } else {
      this.mainSidenav.mode = 'over';
      this.mainSidenav.close();
    }
  }
}
