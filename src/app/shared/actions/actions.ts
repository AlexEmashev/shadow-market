import {Action} from '@ngrx/store';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';

/**
 * Describes user sign-in action
 */
export class UserSignIn implements Action {
  readonly type = USER_SIGN_IN;
}

/**
 * Describes user sign-out action
 */
export class UserSignOut implements Action {
  readonly type = USER_SIGN_OUT;
}

export type All = UserSignIn | UserSignOut;
