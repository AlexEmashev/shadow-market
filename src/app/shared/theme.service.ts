import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import { Themes, Theme } from './themes';
import { filter, defaultIfEmpty } from 'rxjs/operators';
import {AppRoles, AppThemes, UserSettings } from './user-settings';
import { UserSettingsService } from './user-settings.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromReducer from '../shared/reducers/reducers';


/**
 * Service controlling theme setting.
 */
@Injectable()
export class ThemeService {
  private themeProvider: BehaviorSubject<string>;
  currentTheme: Observable<string>;

  constructor(private userSettings: UserSettingsService,
    private store: Store<fromReducer.State>,
  ) {
    this.themeProvider = new BehaviorSubject<string>(this.userSettings.theme);
    this.currentTheme = this.themeProvider.asObservable();
    // On user switch change theme.
    this.store.subscribe(state => {
       this.changeTheme(state.user.theme);
     });
  }

  /**
   * Changes theme to selected.
   */
  changeTheme(theme: string) {
    from(Themes).pipe(
      filter(elem => elem.class === theme),
      defaultIfEmpty(Themes[0])
    ).subscribe(elem => {
      this.themeProvider.next(elem.class);
      // Save props.
      this.userSettings.theme = elem.class;
    }
    );
  }

}
