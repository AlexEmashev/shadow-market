import { Injectable } from '@angular/core';
import {AppRoles, AppThemes, UserSettings} from './user-settings';
import { USERS } from './users-mock';
import { Themes } from './themes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import * as fromReducer from '../shared/reducers/reducers';
import * as userActions from '../shared/actions/actions';

@Injectable()
export class UserSettingsService {
  private userSettings: UserSettings;
  private userSubject = new BehaviorSubject<UserSettings>(this.loadDefaults());
  private currentUserObservable = this.userSubject.asObservable();

  constructor(private store: Store<fromReducer.State>) {
    this.loadSettings();
    this.store.dispatch(new userActions.UserSignIn(this.userSettings));
  }

  /**
   * Use this property to switch the user.
   * So other parts of an app got notified about change.
   */
  private set setUserSettings(user: UserSettings) {
    this.userSettings = user;
    this.saveSettings(); // Save user to LocalStorage.
    this.userSubject.next(this.userSettings);
  }

  /**
   * Returns current user as observable.
   * Used to notify if user changed, to switch app properties.
   */
  public getUserSettings(): Observable<UserSettings> {
    return this.currentUserObservable;
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
      this.setUserSettings = this.loadDefaults();
      this.saveSettings();
    } else {
      this.setUserSettings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  /**
   * Logins user to app using login password.
   * @param login login string
   * @param password password string
   * @returns user observable of settings or null if not logged in
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
   * @returns new observable of user ID or -1 if user already exists.
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
        locale: this.userSettings.locale, // Get current locale set by guest
        role: AppRoles.user,
        session: '',
        theme: this.userSettings.theme, // Get current theme set by guest
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
    this.setUserSettings = user;
    this.store.dispatch(new userActions.UserSignIn(this.userSettings));
    return of(true);
  }

  /**
   * Lgs user out.
   */
  public logOut(): Observable<UserSettings> {
    this.setUserSettings = this.loadDefaults();
    this.saveSettings();
    this.store.dispatch(new userActions.UserSignOut(this.userSettings));
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
    return{
      id: 0,
      name: '',
      theme: Themes[0].class,
      role: AppRoles.guest,
      session: '',
      locale: 'en',
      contact: ''
    };
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
