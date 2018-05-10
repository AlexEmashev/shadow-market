import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Themes } from './shared/themes';
import { ThemeService } from './shared/theme.service';
import { UserSettingsService } from './shared/user-settings.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Shadow market';
  /**
   * Current Theme
   */
  theme: string;

  public constructor(private themeService: ThemeService,
    private overlayContainer: OverlayContainer,
    private translate: TranslateService,
    private userSettings: UserSettingsService) {
      translate.setDefaultLang(userSettings.locale);
  }

  ngOnInit() {
    // Replace style of overlay elements as well.
    this.themeService.currentTheme.subscribe(theme => {
      this.overlayContainer.getContainerElement().classList.remove(this.theme);
      this.overlayContainer.getContainerElement().classList.add(theme);
      this.theme = theme;
    });
  }
}
