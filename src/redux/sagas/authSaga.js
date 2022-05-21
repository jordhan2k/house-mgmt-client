import { all, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setAuthToken } from "../../api/axiosClient";
import { authActionTypes, checkUsernameSucceed, loadUserFail, loadUserRequest, loadUserSucceed, logoutSuccess } from "../actions/authActions";
import authApi from '../../api/authApi';
import { LOCAL_STORAGE_TOKEN_NAME, snackbarSeverity } from "../../utils/constants";
import { getHouseRequest, houseType } from "../actions/houseItemActions";
import { getAllRequest, getLastLoginRequest } from "../actions/notificationActions";
import { openSnackbar } from "../actions/helperActions";

function* loadUserHandler() {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME])
        yield setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);

    try {
        const response = yield authApi.loadUser();
        if (response.data.success) {
            yield put(loadUserSucceed(response.data.user));
            const houseId = response.data.user.houses[0];
            yield put(getHouseRequest(houseId, houseType.mine));
            yield put(getLastLoginRequest());
            yield put(getAllRequest());
        }
    } catch (error) {
        console.log(error);
        yield localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        yield setAuthToken(null);
        yield put(loadUserFail());
        yield put(openSnackbar({
            message: "Oops! Please try again",
            severity: snackbarSeverity.error
        }))
    }

}

function* loadUserWatcher() {
    yield takeLatest(authActionTypes.LOAD_USER_REQUEST, loadUserHandler);
}

function* loginHandler(action) {
    const loginForm = action.payload;

    try {
        const response = yield authApi.login(loginForm);
        if (response.data.success) {
            const accessToken = response.data.accessToken;
            yield localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, accessToken);
            yield put(loadUserRequest());
        } else {
            yield put(openSnackbar({
                message: response.data.message,
                severity: snackbarSeverity.error
            }));
        }
    } catch (error) {
        console.log(error);
    }

}

function* loginWatcher() {
    yield takeLatest(authActionTypes.LOGIN_REQUEST, loginHandler);
}

function* registerHandler(action) {
    const registerForm = action.payload;

    try {
        const response = yield authApi.register(registerForm);
        if (response.data.success) {
            const accessToken = response.data.accessToken;
            yield localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, accessToken);
            yield put(loadUserRequest());
            // yield window.location = "/login";
        } else {
            yield put(openSnackbar({
                message: response.data.message,
                severity: snackbarSeverity.error
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

function* registerWatcher() {
    yield takeLatest(authActionTypes.REGISTER_REQUEST, registerHandler);
}

function* logoutHandler() {
    yield setAuthToken(null);
    yield localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    yield put(logoutSuccess());
}

function* logoutWatcher() {
    yield takeLatest(authActionTypes.LOGOUT_REQUEST, logoutHandler);
}

function* authSaga() {
    yield all([
        loadUserWatcher(),
        loginWatcher(),
        registerWatcher(),
        logoutWatcher(),

    ]);
}

export default authSaga;