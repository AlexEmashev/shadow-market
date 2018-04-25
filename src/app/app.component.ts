import { Component, OnInit } from '@angular/core';
import { Themes } from './themes';
import { ThemeService } from './theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

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

  public constructor(private themeService: ThemeService,
    private overlayContainer: OverlayContainer
  ) {

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
