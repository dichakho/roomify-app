import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchSavedProperties,
} from './api';
import {
  savedGetList,
  savedGetListSuccess,
  savedGetListFail,
} from './slice';

export function* getListSavedSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchSavedProperties, stringifyQuery(payload.query));
    console.log('response', response);

    yield put(savedGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(savedGetListFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(savedGetList, getListSavedSaga),

];
