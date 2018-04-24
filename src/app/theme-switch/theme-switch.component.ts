import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ThemeService } from '../theme.service';
import { Themes, Theme } from '../themes';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  switchTheme(theme: string) {
    this.themeService.changeTheme(theme);
  }

}
