import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchProperties,
  fetchCategories,
  fetchPropertiesById,
  fetchRoomsOfProperty,
  fetchDetailRoom,
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
} from './slice';

export function* getListPropertySaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchProperties, stringifyQuery(payload.query));
    yield put(propertyGetListSuccess(response));
    return true;
  } catch (error) {
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

export default [
  takeLatest(propertyGetList, getListPropertySaga),
  takeLatest(categoryGetList, getListCategorySaga),
  takeLatest(propertyGetDetail, getDetailSaga),
  takeLatest(roomGetList, getRoomsOfPropertySaga),
  takeLatest(roomGetDetail, getDetailRoomSaga),
];
