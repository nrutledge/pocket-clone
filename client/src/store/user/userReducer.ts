import { Option, none, some } from 'fp-ts/lib/Option';
import { UserActionTypes, SET_USER, REMOVE_USER } from './userActions';

export interface UserState {
  user: Option<{ name: string }>;
}

const initialState: UserState = {
  user: none
};

export function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case SET_USER:
      return {
        user: some(action.payload)
      };
    case REMOVE_USER:
      return {
        user: none
      };
    default:
      return state;
  }
}
