import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import AccountsView from './views/Accounts';
import MonthsView from './views/Months';
import StatisticsView from './views/Statistics';
import SyncView from './views/Sync';

import { AccountsReducer } from './models/Accounts';

const reducers = combineReducers({
  accountInfo: AccountsReducer,
})

const store = createStore(reducers);
store.subscribe(() => console.log(store.getState()));

const TabNavigator = createMaterialBottomTabNavigator({
  accounts: AccountsView,
  months: MonthsView,
  statistics: StatisticsView,
  sync: SyncView
}, {
    initialRouteName: 'accounts',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
});

const AppContainer = createAppContainer(TabNavigator);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

store.dispatch({type: 'add'});
store.dispatch({type: 'del', index: 0});

export default App;