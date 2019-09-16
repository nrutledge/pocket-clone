export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

interface SetUserAction {
  type: typeof SET_USER;
  payload: { name: string };
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

export type UserActionTypes = SetUserAction | RemoveUserAction;

export function setUser(user: { name: string }): SetUserAction {
  return {
    type: SET_USER,
    payload: user
  };
}

export function removeUser(): RemoveUserAction {
  return {
    type: REMOVE_USER
  };
}
