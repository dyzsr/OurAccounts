
// reducer
const INITIAL_STATE = {
  key: 0,
  accounts: [],
  index: 0,
};

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

const AccountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "add": return handleAdd(state);
    case "del": return handleDel(state, action.index);
  }
  return state;
}

export { AccountsReducer };


const mapStateToProps = ({accountInfo}) => ({accounts: accountInfo.accounts});

const mapDispatchToProps = (dispatch) => ({
  onClickAdd: () => dispatch({type: 'add'}),
  onClickDel: (idx) => dispatch({type: 'del', index: idx}),
});

export { mapStateToProps, mapDispatchToProps };