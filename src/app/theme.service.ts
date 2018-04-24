import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import { Themes, Theme } from './themes';
import { filter, defaultIfEmpty } from 'rxjs/operators';


/**
 * Service controlling theme setting.
 */
@Injectable()
export class ThemeService {
  private themeProvider = new BehaviorSubject<string>(Themes[0].class);
  currentTheme = this.themeProvider.asObservable();

  constructor() { }

  /**
   * Changes theme to selected.
   */
  changeTheme(theme: string) {
    console.log('Themes:', Themes[0].class);
    console.log("Theme:", theme);
    from(Themes).pipe(
      filter(elem => elem.name === theme),
      defaultIfEmpty(Themes[0])
    ).subscribe(elem =>
      this.themeProvider.next(elem.class)
    );
  }

}
