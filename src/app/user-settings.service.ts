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
    return this.userSettings.id;
  }
  set id(value: number) {
    this.userSettings.id = value;
    this.saveSettings();
  }
  get name(): string {
    return this.userSettings.name;
  }
  set name(value: string) {
    this.userSettings.name = value;
    this.saveSettings();
  }
  get theme(): string {
    return this.userSettings.theme;
  }
  set theme(value: string) {
    this.userSettings.theme = value;
    this.saveSettings();
  }
  get role(): AppRoles {
    return this.userSettings.role;
  }
  set role(value: AppRoles) {
    this.userSettings.role = value;
    this.saveSettings();
  }
  get session(): string {
    return this.userSettings.session;
  }
  set session(value: string) {
    this.userSettings.session = value;
    this.saveSettings();
  }

  /**
   * Saves user settings to storage.
   */
  private saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.userSettings));
  }

  /**
   * Loads user settings from storage
   */
  private loadSettings() {
    if (localStorage.getItem('settings') === null) {
      this.loadDefaults();
      this.saveSettings();
    } else {
      this.userSettings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  /**
   * Loads default values if user isn't logged in.
   */
  private loadDefaults() {
    this.userSettings = new UserSettings();
    this.userSettings.id = 0;
    this.userSettings.name = "Guest";
    this.userSettings.theme = Themes[0].class;
    this.userSettings.role = AppRoles.guest;
    this.userSettings.session = "";

  }
}
