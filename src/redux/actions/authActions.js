export const authActionTypes = {
    LOAD_USER_REQUEST: "auth/load/request",
    LOAD_USER_SUCCEED: "auth/load/succeed",
    LOAD_USER_FAIL: "auth/load/fail",

    LOGIN_REQUEST: "auth/login/request",
    REGISTER_REQUEST: "auth/register/request",

    LOGOUT_REQUEST: "auth/logout/request",
    LOGOUT_SUCCESS: "auth/logout/success",

}

export const loadUserRequest = () => ({
    type: authActionTypes.LOAD_USER_REQUEST
});

export const loadUserSucceed = userInfo => ({
    type: authActionTypes.LOAD_USER_SUCCEED,
    payload: userInfo
});

export const loadUserFail = () => ({
    type: authActionTypes.LOAD_USER_FAIL
});

export const loginRequest = loginForm => ({
    type: authActionTypes.LOGIN_REQUEST,
    payload: loginForm
});

export const registerRequest = userForm => ({
    type: authActionTypes.REGISTER_REQUEST,
    payload: userForm
});

export const logoutRequest = () => ({
    type: authActionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
    type: authActionTypes.LOGOUT_SUCCESS
});


