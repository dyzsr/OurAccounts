import { combineReducers } from 'redux';
import { AccountsReducer } from './models/AccountsReducer';

const reducers = combineReducers({
  accountInfo: AccountsReducer,
});

export { reducers };