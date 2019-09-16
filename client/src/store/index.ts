import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { userReducer } from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
