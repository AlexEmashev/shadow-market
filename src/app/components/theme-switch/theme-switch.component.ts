import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ThemeService } from '../../shared/theme.service';
import { Themes, Theme } from '../../shared/themes';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  /**
   * Current theme set up.
   */
  currentTheme: string;

  constructor(private themeService: ThemeService) { }
  ngOnInit() {
    this.themeService.currentTheme.subscribe(theme => this.currentTheme = theme);
  }

  switchTheme(theme: string) {
    this.themeService.changeTheme(theme);
  }

}
