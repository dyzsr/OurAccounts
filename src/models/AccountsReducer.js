
/**
 * The storage of an account item
 */
class AccountData {
  constructor({date, time, amount, item, desc, imgPath}) {
    this.key = AccountData.key + '';
    console.log(AccountData.key);
    this.date = date;
    this.time = time;
    this.amount = amount;
    this.item = item;
    this.desc = desc;
    this.imgPath = imgPath;
    AccountData.key++;
  }
}
AccountData.key = 0;

export { AccountData };

/**
 * Reducers for model Accounts
 */
const INITIAL_STATE = {
  accounts: [],
  index: 0,
  accountData: new AccountData({}),
};

const AccountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "account_add": return handleAdd(state);
    case "account_del": return handleDel(state, action);
    case "account_select": return handleSelect(state, action);
    case "account_edit": return handleEdit(state, action);
    case "account_save": return handleSave(state, action);
    case "account_back": return handleBack(state, action);
    case "account_edit_date": return handleEditDate(state, action);
    case "account_edit_time": return handleEditTime(state, action);
  }
  return state;
}

const handleAdd = (state) => {
  const accounts = state.accounts.slice();
  accounts.push(new AccountData({}));
  return { ...state, accounts: accounts };
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
    return {...state, index: index, accountData: accounts[index]};
  }
  return state;
}

const handleEdit = (state, {callBack}) => {
  callBack();
  return state;
}

const handleSave = (state, {index, accountData}) => {
  const accounts = state.accounts.slice();
  accounts[index] = accountData;
  return {...state, accounts, accountData};
}

const handleBack = (state, {callBack}) => {
  callBack();
  return state;
}

const handleEditDate = (state, {date}) => {
  const accountData = {...state.accountData, date};
  return {...state, accountData};
}

const handleEditTime = (state, {time}) => {
  const accountData = {...state.accountData, time};
  return {...state, accountData};
}

export { AccountsReducer };