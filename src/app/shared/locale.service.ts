import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserSettingsService } from './user-settings.service';
import { Observable } from 'rxjs/Observable';

/**
 * Service controlling theme setting.
 */
@Injectable()
export class LocaleService {
  private localeProvider: BehaviorSubject<string>;
  localeTheme: Observable<string>;

  constructor(private userSettings: UserSettingsService,
    private translate: TranslateService
  ) {
    this.localeProvider = new BehaviorSubject<string>(this.userSettings.locale);
    this.localeTheme = this.localeProvider.asObservable();
    // On user switch change theme.
    userSettings.getUserSettings().subscribe(
      user => { this.changeLocale(user.locale); }
    );
  }

  /**
   * Changes locale.
   */
  changeLocale(locale: string) {
    this.translate.use(locale);
    this.localeProvider.next(locale);
    this.userSettings.locale = locale;
  }

}
