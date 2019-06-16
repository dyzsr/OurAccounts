import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import AppContainer from './views/HomeScreen';

// create store
import { store, persistor } from './reducer';
store.subscribe(() => console.log(store.getState()));

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large"/>} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;