import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private toolbar: ToolbarService, private userSettings: UserSettingsService) {
   }

  ngOnInit() {
  }

  /**
  * Toggles sidenav menu
  */
  toggeSidenav() {
    this.toolbar.changeMessage('toggleSidenav');
  }
}
