import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { UserSettings } from '../user-settings';
import { USER_SIGN_IN, USER_SIGN_OUT } from '../actions/actions';
import * as userActions from '../actions/actions';
import { environment } from '../../../environments/environment';
import {userReducer} from './user-reducer';


export interface State {
  user: UserSettings;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};

/**
 * ToDo: Not working for now.
 * ActionReducer, for stand along reducer in MetaReducer. Will be called on every action
 * @param actionReducer existing reducer.
 */
export function logger(actionReducer: ActionReducer<State>): ActionReducer<State, userActions.All> {
  return function(state: State, action: any): State {
    console.log('action', action);
    console.log('state: ', state);
    return actionReducer(state, action);
  };
}

/**
 * Separate selector to get user state.
 */
export const getUserState = createFeatureSelector<UserSettings>('user');

/**
 * Create meta reducer for development env.
 */
export const metaRducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

