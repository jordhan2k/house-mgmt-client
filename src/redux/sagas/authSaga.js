import { all, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setAuthToken } from "../../api/axiosClient";
import { authActionTypes, checkUsernameSucceed, loadUserFail, loadUserRequest, loadUserSucceed, logoutSuccess } from "../actions/authActions";
import authApi from '../../api/authApi';
import { LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constants";

function* loadUserHandler() {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        yield setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
        const response = yield authApi.loadUser();
        if (response.data.success) {
            console.log(response.data.user);
            yield put(loadUserSucceed(response.data.user));

        }
    } catch (error) {
        yield localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        yield setAuthToken(null);
        yield put(loadUserFail());
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
            alert(response.data.message);
            console.log(response.data.message)
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
        } else {
            alert(response.data.message);
            console.log(response.data);
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