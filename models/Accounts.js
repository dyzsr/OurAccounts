import { combineReducers } from 'redux';

const INITIAL_STATE = {
  accounts: [],
};

function AccountsReducer(state=INITIAL_STATE, action) {
  return state;
}

export default combineReducers({
  account: AccountsReducer,
});