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
import { DBService } from '../shared/db.service';

@Injectable()
export class UserSettingsService {
  private userSettings: UserSettings;
  private userSubject = new BehaviorSubject<UserSettings>(this.loadDefaults());
  private currentUserObservable = this.userSubject.asObservable();
  /**
   * Key for loading users DB.
   */
  private usersDBKey = 'users';
  /**
   * Key for loading saved user.
   */
  private userDBKey = 'user';

  /**
   * List of existing users.
   */
  private users: UserSettings[];

  constructor(
    private dbService: DBService,
    private store: Store<fromReducer.State>
  ) {
    this.users = this.dbService.loadData(this.usersDBKey, USERS);
    this.userSettings = this.loadUser();
    this.store.dispatch(new userActions.UserSignIn(this.userSettings));
  }

  /**
   * Use this property to switch the user.
   * So other parts of an app got notified about change.
   */
  private set setUserSettings(user: UserSettings) {
    this.userSettings = user;
    this.saveUser();
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
    return this.userSettings.id;
  }
  set id(value: number) {
    this.userSettings.id = value;
    this.saveUser();
  }

  get name(): string {
    return this.userSettings.name;
  }
  set name(value: string) {
    this.userSettings.name = value;
    this.saveUser();
  }

  get theme(): string {
    return this.userSettings.theme;
  }
  set theme(value: string) {
    this.userSettings.theme = value;
    this.saveUser();
  }

  get role(): AppRoles {
    return this.userSettings.role;
  }
  set role(value: AppRoles) {
    this.userSettings.role = value;
    this.saveUser();
  }

  get session(): string {
    return this.userSettings.session;
  }
  set session(value: string) {
    this.userSettings.session = value;
    this.saveUser();
  }

  get locale(): string {
    return this.userSettings.locale;
  }
  set locale(value: string) {
    this.userSettings.locale = value;
    this.saveUser();
  }

  /**
   * Saves user settings to storage.
   */
  private saveUser(): void {
    this.dbService.saveData(this.userDBKey, this.userSettings);
  }

  /**
   * Loads saved user, or defaults if not present.
   */
  private loadUser(): UserSettings {
    return this.dbService.loadData(this.userDBKey, this.loadDefaults());
  }

  /**
   * Logins user to app using login password.
   * @param login login string
   * @param password password string
   * @returns user observable of settings or null if not logged in
   */
  public login(login: string, password: string): Observable<UserSettings> {
    return from(this.users).pipe(
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

    // Check if user exists
    this.users.forEach(user => {
      if (user.name === login) {
        userExists = true;
      }
    });

    // Find last user id
    this.users.forEach(user => {
      lastId = user.id > lastId ? user.id : lastId;
    });

    const newUserId = lastId + 1;

    if (!userExists) {
      const newUser = this.loadDefaults();
      newUser.id = newUserId;
      newUser.name = login;
      newUser.locale = this.userSettings.locale;
      newUser.role = AppRoles.user;
      newUser.theme = this.userSettings.theme;
      newUser.contact = contact;
      this.users.push(newUser);
      this.dbService.saveData(this.usersDBKey, this.users);
      return of(newUserId);
    } else {
      return of(-1);
    }
  }

  /**
   * Loads user as current
   * @param user user object (can be obtained via login() function)
   * @returns Observable of true if authorized or false if not.
   */
  public authrizeUser(user: UserSettings): Observable<boolean> {
    this.setUserSettings = user;
    this.saveUser();
    this.store.dispatch(new userActions.UserSignIn(this.userSettings));
    return of(true);
  }

  /**
   * Lgs user out.
   */
  public logOut(): Observable<UserSettings> {
    this.setUserSettings = this.loadDefaults();
    this.saveUser();
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
    return from(this.users)
    .pipe(
      filter(user => user.id === id),
      defaultIfEmpty(null)
    );
  }
}
