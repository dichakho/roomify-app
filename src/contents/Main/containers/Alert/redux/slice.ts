/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { REHYDRATE } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import { createArrayReducer, createObjectReducer } from '@utils/redux';
import {
  INITIAL_STATE,
  NAME,
  LIST,
  TListNotification,
} from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...createArrayReducer<TListNotification>('notificationGetList', LIST),
  },
  // extraReducers: {
  //   [REHYDRATE]: (state, action) => {
  //     if (action.payload && action.payload.home) {
  //       const { topView } = action.payload.home;
  //       const { outstanding } = action.payload.home;
  //       return {
  //         ...INITIAL_STATE,
  //         topView: {
  //           ...INITIAL_STATE.topView,
  //           data: topView.data,
  //         },
  //         outstanding: {
  //           ...INITIAL_STATE.outstanding,
  //           data: outstanding.data,
  //         },
  //       };
  //     }
  //     return state;
  //   },
  // },
});
export const {
  notificationGetList,
  notificationGetListSuccess,
  notificationGetListFail,
} = slice.actions;
export default slice.reducer;
