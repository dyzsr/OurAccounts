import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AccountsView from './views/Accounts';
import MonthsView from './views/Months';
import StatisticsView from './views/Statistics';
import SyncView from './views/Sync';

// create store
import { store, persistor } from './reducer';

store.subscribe(() => console.log(store.getState()));

// create navigation
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

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size='large'/>} persistor={persistor}>
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;