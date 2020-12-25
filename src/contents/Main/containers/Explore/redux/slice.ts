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
  TBookingRoom,
  BOOKING,
  TCity,
  CITY,
  DISTRICT,
  SUB_DISTRICT,
  CREATE_PROPERTY,
  TCreateProperty,
  TAllRoom,
  ALL_ROOM,
} from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    pushPayloadProperty: (state: any, action: any) => {
      // console.log('payload', state.get(PAYLOAD_PROPERTY));
      // const payload = { ...state.get(PAYLOAD_PROPERTY), ...action.payload.data };
      const payload = state.get(PAYLOAD_PROPERTY).merge(fromJS(action.payload.data));
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
    ...createObjectReducer<TBookingRoom>('bookingRoom', BOOKING),
    cityGetList: (state: any, action: any) => state
      .setIn([CITY, 'loading'], true)
      .setIn([CITY, 'error'], null),
    cityGetListSuccess: (state: any, action:any) => {
      const dataGet = action.payload.result;
      return state
        .setIn([CITY, 'loading'], false)
        .setIn([CITY, 'data'], fromJS(dataGet))
        .setIn([CITY, 'error'], null);
    },
    cityGetListFail: (state: any, action: any) => {
      const error = action.payload;
      return state
        .setIn([CITY, 'loading'], false)
        .setIn([CITY, 'error'], error);
    },

    districtGetList: (state: any, action: any) => state
      .setIn([DISTRICT, 'loading'], true)
      .setIn([DISTRICT, 'error'], null),
    districtGetListSuccess: (state: any, action:any) => {
      const dataGet = action.payload.result;
      return state
        .setIn([DISTRICT, 'loading'], false)
        .setIn([DISTRICT, 'data'], fromJS(dataGet))
        .setIn([DISTRICT, 'error'], null);
    },
    districtGetListFail: (state: any, action: any) => {
      const error = action.payload;
      return state
        .setIn([DISTRICT, 'loading'], false)
        .setIn([DISTRICT, 'error'], error);
    },

    subDistrictGetList: (state: any, action: any) => state
      .setIn([SUB_DISTRICT, 'loading'], true)
      .setIn([SUB_DISTRICT, 'error'], null),
    subDistrictGetListSuccess: (state: any, action:any) => {
      const dataGet = action.payload.result;
      return state
        .setIn([SUB_DISTRICT, 'loading'], false)
        .setIn([SUB_DISTRICT, 'data'], fromJS(dataGet))
        .setIn([SUB_DISTRICT, 'error'], null);
    },
    subDistrictGetListFail: (state: any, action: any) => {
      const error = action.payload;
      return state
        .setIn([SUB_DISTRICT, 'loading'], false)
        .setIn([SUB_DISTRICT, 'error'], error);
    },
    // ...createArrayReducer<TCity>('cityGetList', CITY),
    ...createObjectReducer<TCreateProperty>('createProperty', CREATE_PROPERTY),
    setSearchHistory: (state: any, action: any) => {
      const dataGet = [action.payload.data];
      // console.log('🚀 ~ file: slice.ts ~ line 119 ~ dataGet', dataGet);
      // return state.set('searchHistory', dataGet);
      const data = state
        .get('searchHistory')
        .concat(
          fromJS(dataGet).filter(
            (item: any) => state.get('searchHistory').indexOf(item) < 0,
          ),
        );
      console.log('data', data);

      return state.set('searchHistory', data);
    },
    setCityConfig: (state: any, action: any) => state.set('cityConfig', action.payload.data),
    ...createArrayReducer<TAllRoom>('allRoomGetList', ALL_ROOM),
  },
  extraReducers: {
    [REHYDRATE]: (state, action) => {
      if (action.payload && action.payload.explore) {
        const city = action.payload.explore.get('city');
        const searchHistory = action.payload.explore.get('searchHistory');
        const cityConfig = action.payload.explore.get('cityConfig');

        return INITIAL_STATE.merge({
          city: INITIAL_STATE.get('city').merge({ data: city.get('data') }),
          searchHistory: INITIAL_STATE.get('searchHistory').concat(searchHistory),
          cityConfig,
        });
      }
      return state;
    },
  },
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
  bookingRoom,
  bookingRoomSuccess,
  bookingRoomFail,
  cityGetList,
  cityGetListSuccess,
  cityGetListFail,
  districtGetList,
  districtGetListSuccess,
  districtGetListFail,
  subDistrictGetList,
  subDistrictGetListSuccess,
  subDistrictGetListFail,
  createProperty,
  createPropertySuccess,
  createPropertyFail,
  setSearchHistory,
  setCityConfig,
  allRoomGetList,
  allRoomGetListSuccess,
  allRoomGetListFail,
} = slice.actions;
export default slice.reducer;
