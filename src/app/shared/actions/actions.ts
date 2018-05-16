import {Action} from '@ngrx/store';
import { UserSettings } from '../user-settings';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';

/**
 * Describes user sign-in action
 */
export class UserSignIn implements Action {
  readonly type = USER_SIGN_IN;

  constructor(public payload: UserSettings) {}
}

/**
 * Describes user sign-out action
 */
export class UserSignOut implements Action {
  readonly type = USER_SIGN_OUT;

  constructor(public payload: UserSettings) {}
}

export type All = UserSignIn | UserSignOut;
