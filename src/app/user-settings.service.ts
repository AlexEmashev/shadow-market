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

  /**
   * Registers new user.
   * @param login new user name
   * @param contact user contact
   * @param password user password
   * @returns new user ID or -1 if user already exists.
   */
  public register(login: string, contact: string, password: string): Observable<number> {
    let lastId = 0; // Used to calculate new user ID.
    let userExists = false; // Check if user already exists

    // Find last user id
    USERS.forEach((item, index, ary) => {
      lastId = item.id > lastId ? item.id : lastId;
    });

    const newUserId = lastId + 1;
    // Check if user exists
    USERS.forEach((item, index, ary) => {
      if (item.name === login) {
        userExists = true;
      }
    });

    if (!userExists) {
      USERS.push({
        id: newUserId,
        name: login,
        locale: this.userSettings.locale,
        role: AppRoles.user,
        session: '',
        theme: this.userSettings.theme,
        contact: contact
      });
      return of(newUserId);
    } else {
      return of(-1);
    }
  }

  /**
   * Loads user as current
   * @param user user object (can be obtained via login() function)
   */
  public authrizeUser(user: UserSettings): Observable<boolean> {
    this.userSettings = user;
    this.saveSettings();
    return of(true);
  }

  /**
   * Lgs user out.
   */
  public logOut(): Observable<UserSettings> {
    this.userSettings = this.loadDefaults();
    this.saveSettings();
    return of(this.userSettings);
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
    userSettings.name = '';
    userSettings.theme = Themes[0].class;
    userSettings.role = AppRoles.guest;
    userSettings.session = '';
    userSettings.locale = 'en';

    return userSettings;
  }

  /**
   * Returns user info by ID.
   * @param id user's id
   * @returns user object
   */
  public getUser(id: number): Observable<UserSettings> {
    return from(USERS)
    .pipe(
      filter(user => user.id === id),
      defaultIfEmpty(null)
    );
  }
}
