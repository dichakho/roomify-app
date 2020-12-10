/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { REHYDRATE } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import { createArrayReducer, createObjectReducer } from '@utils/redux';
import {
  INITIAL_STATE,
  NAME,
  TListProperty,
  REGISTER_OWNER,
  TRegisterOwner,
  TMyProperty,
  MY_PROPERTY,
  TAmenities,
  AMENITIES,
} from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    pushPayloadProperty: (state: any, action: any) => {
      console.log('action', action);
    },

    ...createObjectReducer<TRegisterOwner>('registerOwner', REGISTER_OWNER),
    ...createArrayReducer<TMyProperty>('myPropertyGetList', MY_PROPERTY),
    ...createArrayReducer<TAmenities>('amenitiesGetList', AMENITIES),

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
  pushPayloadProperty,
  registerOwner,
  registerOwnerSuccess,
  registerOwnerFail,
  myPropertyGetList,
  myPropertyGetListSuccess,
  myPropertyGetListFail,
  amenitiesGetList,
  amenitiesGetListSuccess,
  amenitiesGetListFail,
} = slice.actions;
export default slice.reducer;
