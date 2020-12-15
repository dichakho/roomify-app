import { handleException } from '@utils/exception';
import { stringifyQuery } from '@utils/redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  registerOwnerApi,
  fetchOwnerPropertyApi,
  fetchAmenitiesApi,
  updateSelfInfoApi,
  getProfileApi,
} from './api';
import {

  registerOwner,
  registerOwnerSuccess,
  registerOwnerFail,
  myPropertyGetList,
  myPropertyGetListSuccess,
  myPropertyGetListFail,
  amenitiesGetList,
  amenitiesGetListSuccess,
  amenitiesGetListFail,
  updateProfile,
  updateProfileSuccess,
  updateProfileFail,
  getProfile,
  getProfileSuccess,
  getProfileFail,

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

export function* fetchMyPropertySaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchOwnerPropertyApi, payload.id, stringifyQuery(payload.query));
    yield put(myPropertyGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(myPropertyGetListFail(error));
    return false;
  }
}

export function* fetchAmenitiesSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchAmenitiesApi, stringifyQuery(payload.query));
    yield put(amenitiesGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(amenitiesGetListFail(error));
    return false;
  }
}

export function* updateProfileSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(updateSelfInfoApi, payload.data);
    yield put(updateProfileSuccess(response));
    return true;
  } catch (error) {
    yield put(updateProfileFail(error));
    return false;
  }
}

export function* getProfileSaga() {
  try {
    const response = yield call(getProfileApi);
    yield put(getProfileSuccess(response));
    return true;
  } catch (error) {
    yield put(getProfileFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(registerOwner, registerOwnerSaga),
  takeLatest(myPropertyGetList, fetchMyPropertySaga),
  takeLatest(amenitiesGetList, fetchAmenitiesSaga),
  takeLatest(updateProfile, updateProfileSaga),
  takeLatest(getProfile, getProfileSaga),
];
