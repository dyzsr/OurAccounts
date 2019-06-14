var moment = require('moment');

/**
 * Reducers for model Months
 */
const INITIAL_STATE = {
  year: parseInt(moment().format('YYYY')),
  month: parseInt(moment().format('M')),
  day: parseInt(moment().format('DD')),
  income: 0,
  expense: 0,
};

const monthsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "month_init": return init(state);
    case "year_select": return yearSelect(state, action);
    case "month_select": return monthSelect(state, action);
    case "day_select": return daySelect(state, action);
    case "month_watch": return monthWatch(state, action);
    case "month_back": return monthBack(state, action);
    case "month_change": return monthChange(state, action);
    case "month_income": return monthIncome(state, action);
    case "month_expense": return monthExpense(state, action);
  }
  return state;
}

const init = (state) => {
  return state;
}

const yearSelect = (state, {year}) => {
  return {...state, year};
}

const monthSelect = (state, {month}) => {
  return {...state, month};
}

const daySelect = (state, {day}) => {
  return {...state, day};
}

const monthWatch = (state, {callBack}) => {
  callBack();
  return state;
}

const monthBack = (state, {callBack}) => {
  callBack();
  return state;
}

const monthChange = (state, {month}) => {
  return {...state, month};
}

const monthIncome = (state, {accounts}) => {
  var income = 0;
  for (var i = 0; i < accounts.length; ++ i) {
    if ((state.month < 10 && !accounts[i].date.indexOf(state.year + "-0" + state.month)) ||
    (state.month >= 10 && !accounts[i].date.indexOf(state.year + "-" + state.month))) {
      if (accounts[i].isIncome) income += parseInt(accounts[i].amount);
      // else outcome += parseInt(accounts[i].amount);
    }
  }
  return {...state, income};
}

const monthExpense = (state, {accounts}) => {
  var expense = 0;
  for (var i = 0; i < accounts.length; ++ i) {
    if ((state.month < 10 && !accounts[i].date.indexOf(state.year + "-0" + state.month)) ||
    (state.month >= 10 && !accounts[i].date.indexOf(state.year + "-" + state.month))) {
      if (!accounts[i].isIncome) expense += parseInt(accounts[i].amount);
    }
  }
  return {...state, expense};
}

export { monthsReducer };