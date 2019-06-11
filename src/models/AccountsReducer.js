
/**
 * The storage of an account item
 */
class AccountData {
  constructor({key, date, time, amount, item, desc, imgPath}) {
    this.key = key;
    this.date = date;
    this.time = time;
    this.amount = amount;
    this.item = item;
    this.desc = desc;
    this.imgPaths = [imgPath];
  }
}

export { AccountData };

/**
 * Reducers for model Accounts
 */
const INITIAL_STATE = {
  next_key: 0,
  accounts: [],
  index: 0,
  accountData: new AccountData({}),
};

const accountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "account_add": return handleAdd(state);
    case "account_del": return handleDel(state, action);
    case "account_select": return handleSelect(state, action);
    case "account_edit": return handleEdit(state, action);
    case "account_save": return handleSave(state);
    case "account_back": return handleBack(state, action);
    case "account_edit_date": return handleEditDate(state, action);
    case "account_edit_time": return handleEditTime(state, action);
    case "account_edit_amount": return handleEditAmount(state, action);
    case "account_edit_item": return handleEditItem(state, action);
    case "account_edit_desc": return handleEditDesc(state, action);
    case "account_add_img": return handleAddImage(state, action);
  }
  return state;
}

const handleAdd = (state) => {
  const accounts = state.accounts.slice();
  accounts.push(new AccountData({key: state.next_key + ''}));
  return { ...state, next_key: state.next_key + 1, accounts: accounts };
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

const handleSave = (state) => {
  const accounts = state.accounts.slice();
  accounts[state.index] = state.accountData;
  return {...state, accounts};
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

const handleEditAmount = (state, {amount}) => {
  const accountData = {...state.accountData, amount};
  return {...state, accountData};
}

const handleEditItem = (state, {item}) => {
  const accountData = {...state.accountData, item};
  return {...state, accountData};
}

const handleEditDesc = (state, {desc}) => {
  const accountData = {...state.accountData, desc};
  return {...state, accountData};
}

const handleAddImage = (state, {imgPath}) => {
  const imgPaths = state.accountData.imgPaths.concat([imgPath]);
  const accountData = {...state.accountData, imgPaths};
  return {...state, accountData};
}

export { accountsReducer };