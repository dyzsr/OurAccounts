/**
 * Reducers for model Accounts
 */
const INITIAL_STATE = {
  year: 0,
  month: 0,
  day: 0,
};

const monthsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "year_select": return yearSelect(state, action);
    case "month_select": return monthSelect(state, action);
    case "day_select": return daySelect(state, action);
    case "month_watch": return monthWatch(state, action);
    case "month_back": return monthBack(state, action);
  }
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

export { monthsReducer };