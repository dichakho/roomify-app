import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchCustomers,
  fetchProperties,
  registerOwnerApi,
} from './api';
import {

  registerOwner,
  registerOwnerSuccess,
  registerOwnerFail,
} from './slice';

export function* registerOwnerSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(registerOwnerApi, payload.data);
    yield put(registerOwnerSuccess(response));
    return true;
  } catch (error) {
    yield put(registerOwnerFail(error));
    return false;
  }
}

export default [
  takeLatest(registerOwner, registerOwnerSaga),

];
