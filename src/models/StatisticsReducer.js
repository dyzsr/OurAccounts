var moment = require('moment');

const INITIAL_STATE = {
  month: moment().format('yyyy-MM'),
  ctg_income: [
    { name: '购物', population: 0, color: 'orange',},
    { name: '餐饮', population: 0, color: 'red',},
    { name: '服装', population: 0, color: 'green',},
    { name: '生活', population: 0, color: 'yellow',},
    { name: '教育', population: 0, color: 'cyan',},
    { name: '娱乐', population: 0, color: 'blue',},
    { name: '出行', population: 0, color: '#889977',},
    { name: '医疗', population: 0, color: '#77aaee',},
    { name: '投资', population: 0, color: 'gray',},
    { name: '其他', population: 1, color: '#991188',},
  ],
  ctg_expense: [
    { name: '购物', population: 0, color: 'orange',},
    { name: '餐饮', population: 0, color: 'red',},
    { name: '服装', population: 0, color: 'green',},
    { name: '生活', population: 0, color: 'yellow',},
    { name: '教育', population: 0, color: 'cyan',},
    { name: '娱乐', population: 0, color: 'blue',},
    { name: '出行', population: 0, color: '#889977',},
    { name: '医疗', population: 0, color: '#77aaee',},
    { name: '投资', population: 0, color: 'gray',},
    { name: '其他', population: 1, color: '#991188',},
  ],
  yearData: [],
};

const statisticsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'statis_count': return handleCount(state, action);
  }
  return state;
}

const handleCount = (state, {month, accounts}) => {
  return {...state, month: moment(month).format('YYYY-MM')};
}

export { statisticsReducer };