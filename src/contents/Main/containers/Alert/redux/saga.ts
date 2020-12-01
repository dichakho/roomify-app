import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchCustomers,
  fetchProperties,
} from './api';
import {
  propertyGetList,
  propertyGetListSuccess,
  propertyGetListFail,
} from './slice';

export function* getListProperySaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchProperties, stringifyQuery(payload.query));
    yield put(propertyGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(propertyGetListFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(propertyGetList, getListProperySaga),

];
