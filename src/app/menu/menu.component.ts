import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  /**
   * Breakpoint for Sidenav displaying mode.
   */
  menuBreakpoing = 720;

  /**
  * Get access to sidenav component on view.
  */
  @ViewChild('mainSidenav')
  mainSidenav:MatSidenav;

  /**
   * Add event listenet on window resize.
   */
  @HostListener('window:resize') onResize() {
    this.switchSidenavMode();
  }


  constructor(private toolbar: ToolbarService) { }

  ngOnInit() {
    // Subscribe to the observable and connect it to a message.
    this.toolbar.currentMessage.subscribe(message => this.onToolbarStateChanged(message));
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
        this.mainSidenav.toggle();
      break;
    }
  }

  /**
   * Switches Sidenav mode depending on the screen width.
   */
  switchSidenavMode() {
    let width = window.innerWidth;

    if (width > this.menuBreakpoing) {
      this.mainSidenav.mode = 'side';
      this.mainSidenav.open();
    } else {
      this.mainSidenav.mode = 'over';
      this.mainSidenav.close();
    }
  }
}
