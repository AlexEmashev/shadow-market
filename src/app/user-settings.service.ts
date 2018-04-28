import { Injectable } from '@angular/core';
import {AppRoles, AppThemes, UserSettings} from './user-settings';
import { Themes } from './themes';

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
   * Loads default values in case of a new user.
   * @returns Returns new instance of UserSettings with safe defults.
   * This usefull when developer added a new setting
   * and the user doesn't have this setting while they have the other.
   * So this missed setting will be set in default.
   */
  private loadDefaults(): UserSettings {
    const userSettings = new UserSettings();
    userSettings.id = 0;
    userSettings.name = 'Guest';
    userSettings.theme = Themes[0].class;
    userSettings.role = AppRoles.guest;
    userSettings.session = '';
    userSettings.locale = 'en';

    return userSettings;
  }
}
