import { Injectable } from '@angular/core';
// Connect BehaviorSubject, to make sure, every subscriber recieves
// the value on subscription.
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
* Service emitting messages from the app Toolbar.
*/
@Injectable()
export class HeaderService {
  // First value of the message
  private messageSource = new BehaviorSubject<string>('empty');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  /**
   * Function emiting changes in toolbar.
   * @param message message produced by toolbar
   */
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

}
