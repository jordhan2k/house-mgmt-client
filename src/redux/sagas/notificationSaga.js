import { all, put, takeLatest } from "redux-saga/effects";
import notificationApi from "../../api/notificationApi";
import { getLastLoginSucceed, notificationActionTypes } from "../actions/notificationActions";

function* getAllHandler() {

}

function* getAllWatcher() {

}

function* modifyHandler() {

}

function* modifyWatcher() {

}

function* getLastLoginHandler() {
    try {
        const response = yield notificationApi.getLastLogin();
        if (response.data.success) {
            yield put(getLastLoginSucceed(response.data.lastLogin));
        }
    } catch (error) {
        console.log(error);
    }
}

function* getLastLoginWatcher() {
    yield takeLatest(notificationActionTypes.GET_LAST_LOGIN_REQUEST, getLastLoginHandler);
}


function* notificationSaga() {
    yield all([
        getAllWatcher(),
        getLastLoginWatcher(),
        modifyWatcher()
    ]);
}

export default notificationSaga;