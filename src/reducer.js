import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'

import { accountsReducer } from './models/AccountsReducer';
import { monthsReducer } from './models/MonthsReducer';
import { statisticsReducer } from './models/StatisticsReducer';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['monthInfo', 'statisticsInfo'],
};

const accountsPersistConfig = {
  key: 'accounts',
  storage,
  blacklist: ['index', 'accountData'],
};

// const monthsPersistConfig = {
//   key: 'months',
//   storage,
//   blacklist: ['month', 'day', 'year'],
// };

const reducer = combineReducers({
  accountInfo: persistReducer(accountsPersistConfig, accountsReducer),
  monthInfo: monthsReducer,
  statisticsInfo: statisticsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };