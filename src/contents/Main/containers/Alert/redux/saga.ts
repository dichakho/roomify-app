import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchCustomers,
  fetchNotification,
} from './api';
import {
  notificationGetList,
  notificationGetListSuccess,
  notificationGetListFail,
} from './slice';

export function* getListNotificationSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchNotification, stringifyQuery(payload.query));
    yield put(notificationGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(notificationGetListFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(notificationGetList, getListNotificationSaga),

];
