/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { REHYDRATE } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import { createArrayReducer, createObjectReducer } from '@utils/redux';
import { fromJS } from 'immutable';
import {
  INITIAL_STATE,
  NAME,
  PROPERTY,
  TListProperty,
  PAYLOAD_PROPERTY,
  TCategories,
  CATEGORY,
  TDetail,
  DETAIL,
  TRoomsOfProperty,
  LIST_ROOM,
  TDetailRoom,
  DETAIL_ROOM,
} from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    pushPayloadProperty: (state: any, action: any) => {
      const payload = { ...state.get(PAYLOAD_PROPERTY).toJS(), ...action.payload.data };
      return state.set(PAYLOAD_PROPERTY, payload);
    },
    clearPayloadProperty: (state: any) => state.set(PAYLOAD_PROPERTY, INITIAL_STATE.get(PAYLOAD_PROPERTY)),
    ...createArrayReducer<TListProperty>(`${PROPERTY}GetList`, PROPERTY),
    ...createArrayReducer<TCategories>('categoryGetList', CATEGORY),
    ...createObjectReducer<TDetail>('propertyGetDetail', DETAIL),
    clearDetail: (state: any) => state.set(DETAIL, INITIAL_STATE.get(DETAIL)),
    // ...createArrayReducer<TRoomsOfProperty>('roomGetList', LIST_ROOM),
    roomGetList: (state: any, action: any) => state.setIn([LIST_ROOM, 'loading'], true)
      .setIn([LIST_ROOM, 'error'], null),
    roomGetListSuccess: (state: any, action:any) => {
      const dataGet = action.payload.result;
      return state
        .setIn([LIST_ROOM, 'loading'], false)
        .setIn([LIST_ROOM, 'data'], fromJS(dataGet))
        .setIn([LIST_ROOM, 'error'], null);
    },
    roomGetListFail: (state: any, action: any) => {
      const error = action.payload;
      return state
        .setIn([LIST_ROOM, 'loading'], false)
        .setIn([LIST_ROOM, 'error'], error);
    },
    clearListRoom: (state: any) => state.set(LIST_ROOM, INITIAL_STATE.get(LIST_ROOM)),
    ...createObjectReducer<TDetailRoom>('roomGetDetail', DETAIL_ROOM),
  },
  // extraReducers: {
  //   [REHYDRATE]: (state, action) => {
  //     if (action.payload && action.payload.explore) {
  //       // console.log('alo', action.payload.explore);
  //       // const { category } = action.payload.explore;
  //       // return INITIAL_STATE.merge({
  //       //   category: INITIAL_STATE.get('category').merge({ data: category.data }),
  //       // });
  //     }
  //     return state;
  //   },
  // },
});
export const {
  pushPayloadProperty,
  propertyGetList,
  propertyGetListSuccess,
  propertyGetListFail,
  clearPayloadProperty,
  categoryGetList,
  categoryGetListSuccess,
  categoryGetListFail,
  propertyGetDetail,
  propertyGetDetailSuccess,
  propertyGetDetailFail,
  clearDetail,
  roomGetList,
  roomGetListSuccess,
  roomGetListFail,
  clearListRoom,
  roomGetDetail,
  roomGetDetailSuccess,
  roomGetDetailFail,
} = slice.actions;
export default slice.reducer;
