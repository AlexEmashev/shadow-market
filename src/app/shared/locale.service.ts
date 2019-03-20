import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { UserSettingsService } from './user-settings.service';
import { Store } from '@ngrx/store';
import * as fromReducer from '../shared/reducers/reducers';

/**
 * Service controlling theme setting.
 */
@Injectable()
export class LocaleService {
  private localeProvider: BehaviorSubject<string>;
  localeTheme: Observable<string>;

  constructor(private userSettings: UserSettingsService,
    private translate: TranslateService,
    private store: Store<fromReducer.State>
  ) {
    this.localeProvider = new BehaviorSubject<string>(this.userSettings.locale);
    this.localeTheme = this.localeProvider.asObservable();

    store.select('user').subscribe(state => {
      this.changeLocale(state.locale);
    });
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
