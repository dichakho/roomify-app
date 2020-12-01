import exploreSaga from '@contents/Main/containers/Explore/redux/saga';
import savedSaga from '@contents/Main/containers/Saved/redux/saga';
import profileSaga from '@contents/Main/containers/Profile/redux/saga';

export default [
  ...exploreSaga,
  ...savedSaga,
  ...profileSaga,

];
