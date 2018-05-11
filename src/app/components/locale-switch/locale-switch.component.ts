import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingsService } from '../../shared/user-settings.service';

@Component({
  selector: 'app-locale-switch',
  templateUrl: './locale-switch.component.html',
  styleUrls: ['./locale-switch.component.scss']
})
export class LocaleSwitchComponent implements OnInit {
  /**
   * Indicates current locale
   */
  currentLocale: string;

  constructor( private translate: TranslateService,
    private userSettings: UserSettingsService
  ) { }

  ngOnInit() {
    this.currentLocale = this.translate.defaultLang;
    this.userSettings.getUserSettings().subscribe(user => {
      this.switchLocale(user.locale);
    });
  }
  /**
   * Switches app locale.
   * @param locale locale string e.g. "en", "ru".
   */
  switchLocale(locale: string) {
    this.translate.use(locale);
    this.userSettings.locale = locale;
    this.currentLocale = this.translate.currentLang;
  }

}
