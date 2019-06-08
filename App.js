import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const AccountsView = require('./views/Accounts').default;
import MonthsView from './views/Months';
import StatisticsView from './views/Statistics';
import SyncView from './views/Sync';

const store = createStore(require('./models/Accounts').default);

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer></AppContainer>
      </Provider>
    );
  }
};