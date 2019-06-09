// reducer
const INITIAL_STATE = {
  key: 0,
  accounts: [],
  index: 0,
};

const AccountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "add": return handleAdd(state);
    case "del": return handleDel(state, action.index);
    case "setIndex": return handleSetIndex(state, action.index);
    case "edit": return handleEdit(state, action.navigator);
  }
  return state;
}

const handleAdd = (state) => {
  const accounts = state.accounts.slice();
  accounts.push({
    key: state.key + 1 + '',
    text: 'new account',
  });
  return { ...state, key: state.key + 1, accounts: accounts };
}

const handleDel = (state, index) => {
  const accounts = state.accounts;
  if (accounts.length > 0 && index < accounts.length) {
    return {...state, accounts: accounts.slice(0, index).concat(accounts.slice(index + 1))};
  }
  return state;
}

const handleSetIndex = (state, index) => {
  const accounts = state.accounts;
  if (accounts.length > 0 && index < accounts.length) {
    return {...state, index: index};
  }
  return state;
}

const handleEdit = (state, navigator) => {
  navigator.navigate('accountEdit');
  return state;
}

export { AccountsReducer };