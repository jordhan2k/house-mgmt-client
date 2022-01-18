import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import notificationSaga from './notificationSaga';


function* rootSaga() {
    yield all([
        authSaga(),
        notificationSaga(),

    ]);
}

export default rootSaga;