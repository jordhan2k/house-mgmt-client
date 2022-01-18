export const notificationActionTypes = {
    GET_ALL_REQUEST: "notifications/getAll/request",
    GET_ALL_SUCCEED: "notifications/getAll/succeed",
    GET_ALL_FAIL: "notifications/getAll/fail",

    GET_LAST_LOGIN_REQUEST: "notifications/lastLogin/request",
    GET_LAST_LOGIN_SUCCEED: "notifications/lastLogin/succeed",

    MODIFY_REQUEST: "notifications/modify/request",
    MODIFY_SUCCEED: "notifications/modify/succeed",
};

export const getAllRequest = () => ({
    type: notificationActionTypes.GET_ALL_REQUEST,
});

export const getAllSucceed = notifications => ({
    type: notificationActionTypes.GET_ALL_SUCCEED,
    payload: notifications
});

export const getLastLoginRequest = () => ({
    type: notificationActionTypes.GET_LAST_LOGIN_REQUEST
});

export const getLastLoginSucceed = lastLogin => ({
    type: notificationActionTypes.GET_LAST_LOGIN_SUCCEED,
    payload: lastLogin
});