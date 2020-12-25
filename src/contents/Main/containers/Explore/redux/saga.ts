import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchProperties,
  fetchCategories,
  fetchPropertiesById,
  fetchRoomsOfProperty,
  fetchDetailRoom,
  bookingRoomApi,
  fetchCityApi,
  fetchDistrictApi,
  fetchSubDistrictApi,
  createPropertyApi,
  getListRoomApi,
} from './api';
import {
  propertyGetList,
  propertyGetListSuccess,
  propertyGetListFail,
  categoryGetList,
  categoryGetListSuccess,
  categoryGetListFail,
  propertyGetDetail,
  propertyGetDetailSuccess,
  propertyGetDetailFail,
  roomGetList,
  roomGetListSuccess,
  roomGetListFail,
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
  allRoomGetList,
  allRoomGetListSuccess,
  allRoomGetListFail,
} from './slice';

export function* getListPropertySaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchProperties, stringifyQuery(payload.query));
    yield put(propertyGetListSuccess(response));
    return true;
  } catch (error) {
    console.log('error', error);

    yield put(propertyGetListFail(yield* handleException(error)));
    return false;
  }
}
export function* getListCategorySaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchCategories, stringifyQuery(payload.query));

    yield put(categoryGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(categoryGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getDetailSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchPropertiesById, payload.id);
    yield put(propertyGetDetailSuccess(response));
    return true;
  } catch (error) {
    yield put(propertyGetDetailFail(yield* handleException(error)));
    return false;
  }
}

export function* getRoomsOfPropertySaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchRoomsOfProperty, payload.id);
    yield put(roomGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(roomGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getDetailRoomSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchDetailRoom, payload.id);
    yield put(roomGetDetailSuccess(response));
    return true;
  } catch (error) {
    console.log('errorr', error);

    yield put(roomGetDetailFail(yield* handleException(error)));
    return false;
  }
}

export function* bookingRoomSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(bookingRoomApi, payload.id);
    yield put(bookingRoomSuccess(response));
    return true;
  } catch (error) {
    yield put(bookingRoomFail(yield* handleException(error)));
    return false;
  }
}

export function* getCitySaga({ payload }: { payload: any}) {
  try {
    const response = yield call(fetchCityApi, stringifyQuery(payload.query));
    yield put(cityGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(cityGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getDistrictSaga({ payload }: { payload: any}) {
  try {
    const response = yield call(fetchDistrictApi, payload.id);
    yield put(districtGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(districtGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getSubDistrictSaga({ payload }: { payload: any}) {
  try {
    const response = yield call(fetchSubDistrictApi, payload.id);
    yield put(subDistrictGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(subDistrictGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* createPropertySaga({ payload }: { payload: any}) {
  try {
    console.log('payload.data', payload.data);

    const response = yield call(createPropertyApi, payload.data);
    yield put(createPropertySuccess(response));
    return true;
  } catch (error) {
    console.log('error', error);

    yield put(createPropertyFail(yield* handleException(error)));
    return false;
  }
}

export function* getAllRoomSaga({ payload }: { payload: any}) {
  try {
    const response = yield call(getListRoomApi, stringifyQuery(payload.query));
    yield put(allRoomGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(allRoomGetListFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(propertyGetList, getListPropertySaga),
  takeLatest(categoryGetList, getListCategorySaga),
  takeLatest(propertyGetDetail, getDetailSaga),
  takeLatest(roomGetList, getRoomsOfPropertySaga),
  takeLatest(roomGetDetail, getDetailRoomSaga),
  takeLatest(bookingRoom, bookingRoomSaga),
  takeLatest(cityGetList, getCitySaga),
  takeLatest(districtGetList, getDistrictSaga),
  takeLatest(subDistrictGetList, getSubDistrictSaga),
  takeLatest(createProperty, createPropertySaga),
  takeLatest(allRoomGetList, getAllRoomSaga),
];
