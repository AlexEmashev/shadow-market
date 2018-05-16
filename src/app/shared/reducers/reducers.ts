import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { UserSettings } from '../user-settings';
import { USER_SIGN_IN, USER_SIGN_OUT } from '../actions/actions';
import * as userActions from '../actions/actions';
import { environment } from '../../../environments/environment';


export interface State {
  user: UserSettings;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};

// ToDo: may be remove export
/**
 * Main reducer for user settings
 * @param state curent user state
 * @param action action which should be performed on user.
 */
export function userReducer(state: UserSettings, action: userActions.All): UserSettings {
  console.log(state, action);
  switch (action.type) {
    case userActions.USER_SIGN_IN: {
      console.log('Signed in');
      return null;
    }
    case userActions.USER_SIGN_OUT: {
      console.log('Signed out');
      return null;
    }
    default: {
      console.log('Default?');
      return state;
    }
  }
}

/**
 * ActionReducer, for stand along reducer in MetaReducer. Will be called on every action
 * @param actionReducer existing reducer.
 */
export function logger(actionReducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('action', action);
    console.log('state: ', state);
    return actionReducer(state, action);
  };
}

export const getUserState = createFeatureSelector<UserSettings>('user');

/**
 * Create meta reducer for development env.
 */
export const metaRducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

