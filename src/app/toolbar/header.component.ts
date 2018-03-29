import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private toolbar: ToolbarService) {
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
