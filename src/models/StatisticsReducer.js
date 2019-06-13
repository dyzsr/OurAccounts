var moment = require('moment');

const INITIAL_STATE = {
  month: moment().format('YYYY-MM'),
  categories: [
    { name: '购物', income: 0, expense: 0, },
    { name: '餐饮', income: 0, expense: 0, },
    { name: '服装', income: 0, expense: 0, },
    { name: '生活', income: 0, expense: 0, },
    { name: '教育', income: 0, expense: 0, },
    { name: '娱乐', income: 0, expense: 0, },
    { name: '出行', income: 0, expense: 0, },
    { name: '医疗', income: 0, expense: 0, },
    { name: '投资', income: 0, expense: 0, },
    { name: '其他', income: 1, expense: 1, },
  ],
  yearData: [],
};

const statisticsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'statis_count': return handleCount(state, action);
    case 'statis_month': return handleMonth(state, action);
  }
  return state;
}

const handleCount = (state, {month}) => {
  return {...state, month: moment(month).format('YYYY-MM')};
}

const handleMonth = (state, {accounts}) => {
  var categories = [
    { name: '购物', income: 0, expense: 0, },
    { name: '餐饮', income: 0, expense: 0, },
    { name: '服装', income: 0, expense: 0, },
    { name: '生活', income: 0, expense: 0, },
    { name: '教育', income: 0, expense: 0, },
    { name: '娱乐', income: 0, expense: 0, },
    { name: '出行', income: 0, expense: 0, },
    { name: '医疗', income: 0, expense: 0, },
    { name: '投资', income: 0, expense: 0, },
    { name: '其他', income: 0, expense: 0, },
  ];
  for (var i = 0; i < accounts.length; ++ i) {
    if (!accounts[i].date.indexOf(state.month)) {
      for (var j = 0; j < categories.length; ++ j)
        if (categories[j].name == accounts[i].item) {
          if (accounts[i].isIncome) categories[j].income += parseInt(accounts[i].amount);
          else categories[j].expense += parseInt(accounts[i].amount);
        }
    }
  }
  for (var j = 0; j < categories.length; ++ j) {
    console.warn(categories[j].income);
  }
  return {...state, categories};
}

export { statisticsReducer };