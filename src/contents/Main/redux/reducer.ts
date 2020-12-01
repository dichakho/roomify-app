import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import explore from '@contents/Main/containers/Explore/redux/slice';
import saved from '@contents/Main/containers/Saved/redux/slice';
import profile from '@contents/Main/containers/Profile/redux/slice';

const persistConfig = {
  key: 'main',
  storage: AsyncStorage,
  whitelist: [],
};
const main = persistReducer(
  persistConfig,
  combineReducers({
    explore,
    saved,
    profile,
  }),
);
export default main;
