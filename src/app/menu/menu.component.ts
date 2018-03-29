import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  /**
  * Get access to sidenav component on view.
  */
  @ViewChild('mainSidenav')
  mainSidenav:MatSidenav;

  constructor(private toolbar: ToolbarService) { }

  ngOnInit() {
    // Subscribe to the observable and connect it to a message.
    this.toolbar.currentMessage.subscribe(message => this.onToolbarStateChanged(message));
  }

  /**
  * Get access to component view.
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

}
