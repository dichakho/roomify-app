import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchSavedProperties,
  fetchRoomateApi,
  fetchDetailRoomateApi,
} from './api';
import {
  savedGetList,
  savedGetListSuccess,
  savedGetListFail,
  roomateGetList,
  roomateGetListSuccess,
  roomateGetListFail,
  roomateGetDetail,
  roomateGetDetailSuccess,
  roomateGetDetailFail,
} from './slice';

export function* getListSavedSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchSavedProperties, stringifyQuery(payload.query));

    yield put(savedGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(savedGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getListRoomateSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchRoomateApi, stringifyQuery(payload.query));

    yield put(roomateGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(roomateGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getDetailRoomateSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchDetailRoomateApi, payload.id);

    yield put(roomateGetDetailSuccess(response));
    return true;
  } catch (error) {
    yield put(roomateGetDetailFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(savedGetList, getListSavedSaga),
  takeLatest(roomateGetList, getListRoomateSaga),
  takeLatest(roomateGetDetail, getDetailRoomateSaga),

];
