import { Component, OnInit } from '@angular/core';
import { Themes } from './themes';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Shadow market';
  /**
   * Current Theme
   */
  theme: string;

  public constructor(private themeService: ThemeService) {

  }

  ngOnInit() {
    this.themeService.currentTheme.subscribe(theme => this.theme = theme);
  }
}
