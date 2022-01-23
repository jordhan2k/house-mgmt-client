import { all, put, takeLatest } from "redux-saga/effects";
import notificationApi from "../../api/notificationApi";
import { getAllSucceed, getLastLoginSucceed, notificationActionTypes } from "../actions/notificationActions";

function* getAllHandler() {
    try {
        const response = yield notificationApi.getAllNotifications();
        console.log(response.data);
        if (response.data.success) {
            yield put(getAllSucceed(response.data.notifications));
        }
    } catch (error) {

    }

}

function* getAllWatcher() {
    yield takeLatest(notificationActionTypes.GET_ALL_REQUEST, getAllHandler);
}

function* modifyHandler() {

}

function* modifyWatcher() {
    yield takeLatest(notificationActionTypes.MODIFY_REQUEST, modifyHandler);
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