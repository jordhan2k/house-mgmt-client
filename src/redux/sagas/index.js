import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import commentSaga from './commentSaga';
import houseItemSaga from './houseItemSaga';
import notificationSaga from './notificationSaga';
import searchSaga from './searchSaga';


function* rootSaga() {
    yield all([
        authSaga(),
        notificationSaga(),
        houseItemSaga(),
        searchSaga(),
        commentSaga()
    ]);
}

export default rootSaga;