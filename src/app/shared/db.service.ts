import { Injectable } from '@angular/core';

/**
 *  Service for storing the data for the app.
 */
@Injectable()
export class DBService {
  constructor() {
  }

  /**
   * Returns true if key exists.
   * @param key key to check
   */
  keyExists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Saves data using key parameter.
   * @param key key value to save the data
   * @param data data to save ()
   */
  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Loads data from storage.
   * @param key key value to load the data
   * @param default_val Not required param.
   * Returns this value if data not present in storage. Saves this data to storage as well.
   * @returns loaded data if existed, returns null if not also returns @param default_val if passed.
   */
  loadData(key: string, default_val: any  = null): any {
    if (this.keyExists(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      this.saveData(key, default_val);
      return default_val;
    }
  }

  /**
   * Deletes data from storage.
   * @param key key value to delete
   */
  deleteData(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Wipes all stored data.
   */
  deleteAll() {
    localStorage.clear();
  }
}
