import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Accounts from './Accounts';
import Months from './Months';
import Statistics from './Statistics';
import Sync from './Sync';

const TabNavigator = createMaterialBottomTabNavigator({
  accounts: Accounts,
  months: Months,
  statistics: Statistics,
  sync: Sync
}, {
    initialRouteName: 'accounts',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
});

const App = createAppContainer(TabNavigator);

export default App;