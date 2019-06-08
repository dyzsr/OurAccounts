import { combineReducers } from 'redux';

const INITIAL_STATE = {
  accounts: [],
};

function AccountsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "add": 
  }
  return state;
}

function reducerAdd(state) {
  const accounts = state.accounts;
  return { ...state, accounts };
}

export default combineReducers({
  account: AccountsReducer,
});