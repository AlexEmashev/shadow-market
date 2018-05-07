import { Injectable } from '@angular/core';
import {AppRoles, AppThemes, UserSettings} from './user-settings';
import { USERS } from './users-mock';
import { Themes } from './themes';
import { Observable } from 'rxjs/Observable';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

@Injectable()
export class UserSettingsService {

  private userSettings: UserSettings;

  constructor() {
    this.loadSettings();
  }

  get id(): number {
    if (this.userSettings.id) {
      return this.userSettings.id;
    } else {
      return this.loadDefaults().id;
    }
  }
  set id(value: number) {
    this.userSettings.id = value;
    this.saveSettings();
  }

  get name(): string {
    if (this.userSettings.name) {
      return this.userSettings.name;
    } else {
      return this.loadDefaults().name;
    }
  }
  set name(value: string) {
    this.userSettings.name = value;
    this.saveSettings();
  }

  get theme(): string {
    if (this.userSettings.theme) {
      return this.userSettings.theme;
    } else {
      return this.loadDefaults().theme;
    }
  }
  set theme(value: string) {
    this.userSettings.theme = value;
    this.saveSettings();
  }

  get role(): AppRoles {
    if (this.userSettings.role) {
      return this.userSettings.role;
    } else {
      return this.loadDefaults().role;
    }
  }
  set role(value: AppRoles) {
    this.userSettings.role = value;
    this.saveSettings();
  }

  get session(): string {
    if (this.userSettings.session) {
      return this.userSettings.session;
    } else {
      return this.loadDefaults().session;
    }
  }
  set session(value: string) {
    this.userSettings.session = value;
    this.saveSettings();
  }

  get locale(): string {
    if (this.userSettings.locale) {
      return this.userSettings.locale;
    } else {
      return this.loadDefaults().locale;
    }
  }
  set locale(value: string) {
    this.userSettings.locale = value;
    this.saveSettings();
  }

  /**
   * Saves user settings to storage.
   */
  private saveSettings(): void {
    localStorage.setItem('settings', JSON.stringify(this.userSettings));
  }

  /**
   * Loads user settings from storage
   */
  private loadSettings() {
    if (localStorage.getItem('settings') === null) {
      this.userSettings = this.loadDefaults();
      this.saveSettings();
    } else {
      this.userSettings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  /**
   * Logins user to app using login password.
   * @param login login string
   * @param password password string
   */
  public login(login: string, password: string): Observable<UserSettings> {
    return from(USERS).pipe(
      filter(user => user.name === login),
      defaultIfEmpty(null)
    );
  }

  public register(login: string, password: string): Observable<number> {
    let lastId = 0;

    USERS.forEach((item, index, ary) => {
      lastId = item.id > lastId ? item.id : lastId;
    });

    return from(USERS).pipe(
      filter(user => user.name === login),
      map(user => -1),
      defaultIfEmpty(
        {
          id: lastId + 1,
          name: login,
          locale: this.userSettings.locale,
          role: AppRoles.user,
          session: '',
          theme: this.userSettings.theme
      })
    );
  }

  /**
   * Loads user as current
   * @param user user object (can be obtained via login() function)
   */
  public authrizeUser(user: UserSettings) {
    this.userSettings.id = user.id;
    this.userSettings.locale = user.locale;
    this.userSettings.name = user.name;
    this.userSettings.role = user.role;
    this.userSettings.session = user.session;
    this.userSettings.theme = user.theme;
    this.saveSettings();
  }

  /**
   * Lgs out the user.
   */
  public logOut() {
    const defaults = this.loadDefaults();
    this.userSettings.id = defaults.id;
    this.userSettings.locale = defaults.locale;
    this.userSettings.name = defaults.name;
    this.userSettings.role = defaults.role;
    this.userSettings.session = defaults.session;
    this.userSettings.theme = defaults.theme;
    this.saveSettings();
  }

  /**
   * Loads default values in case of a new user.
   * @returns Returns new instance of UserSettings with safe defults.
   * This usefull when developer added a new setting
   * and the user doesn't have this setting while they have the other.
   * So this missed setting will be set in default.
   */
  private loadDefaults(): UserSettings {
    const userSettings = new UserSettings();
    userSettings.id = 0;
    userSettings.name = 'Sign in';
    userSettings.theme = Themes[0].class;
    userSettings.role = AppRoles.guest;
    userSettings.session = '';
    userSettings.locale = 'en';

    return userSettings;
  }

  /**
   * Returns user info by ID. Remarks: don't use it in the real app.
   * @param id user's id
   */
  public getUser(id: number): Observable<UserSettings> {
    return from(USERS)
    .pipe(
      filter(user => user.id === id),
      defaultIfEmpty(null)
    );
  }
}
