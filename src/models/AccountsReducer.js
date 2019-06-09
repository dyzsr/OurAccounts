// reducer
const INITIAL_STATE = {
  key: 0,
  accounts: [],
  index: 0,
};

class AccountData {
  constructor({date, time, amount, item, desc, imgPath}) {
    this.date = date;
    this.time = time;
    this.amount = amount;
    this.item = item;
    this.desc = desc;
    this.imgPath = imgPath;
  }
}

export { AccountData };

const AccountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "account_add": return handleAdd(state);
    case "account_del": return handleDel(state, action);
    case "account_select": return handleSelect(state, action);
    case "account_edit": return handleEdit(state, action);
    case "account_save": return handleSave(state, action);
    case "account_back": return handleBack(state, action);
  }
  return state;
}

const handleAdd = (state) => {
  const accounts = state.accounts.slice();
  accounts.push({
    key: state.key + 1 + '',
    data: new AccountData(),
  });
  return { ...state, key: state.key + 1, accounts: accounts };
}

const handleDel = (state, {index}) => {
  const accounts = state.accounts;
  if (accounts.length > 0 && index < accounts.length) {
    return {...state, accounts: accounts.slice(0, index).concat(accounts.slice(index + 1))};
  }
  return state;
}

const handleSelect = (state, {index}) => {
  const accounts = state.accounts;
  if (accounts.length > 0 && index < accounts.length) {
    return {...state, index: index};
  }
  return state;
}

const handleEdit = (state, {callBack}) => {
  callBack();
  return state;
}

const handleSave = (state, {index, account}) => {
  const accounts = state.accounts.slice();
  accounts[index] = account;
  return {...state, accounts};
}

const handleBack = (state, {callBack}) => {
  callBack();
  return state;
}

export { AccountsReducer };