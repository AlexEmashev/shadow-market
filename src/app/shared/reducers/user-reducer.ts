import { USER_SIGN_IN, USER_SIGN_OUT } from '../actions/actions';
import * as userActions from '../actions/actions';
import { UserSettings } from '../user-settings';

/**
 * Main reducer for user settings
 * @param state curent user state
 * @param action action which should be performed on user.
 */
export function userReducer(state: UserSettings, action: userActions.All): UserSettings {
  switch (action.type) {
    case userActions.USER_SIGN_IN: {
      return action.payload;
    }
    case userActions.USER_SIGN_OUT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
