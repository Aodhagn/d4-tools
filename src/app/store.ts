import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import calculatorReducer from '../features/calculator/calculatorSlice';
import loginReducer from '../features/login/loginSlice';
import appDataReducer from '../data/dataSlice';

const loginPersistConfig = {
  key: 'login',
  storage,
  blacklist: ['loginStatus', 'showWelcome']
}

export const rootReducer = combineReducers({
  calculator: calculatorReducer,
  login: persistReducer(loginPersistConfig, loginReducer),
  appData: appDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['setNewTimer']
      }
    })
});

export const persistor = persistStore(store);
console.log(persistor)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;