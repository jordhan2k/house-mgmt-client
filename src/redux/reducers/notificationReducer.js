import { notificationActionTypes } from "../actions/notificationActions";

const initialState = {
    lastLogin: null,
    notifications: [],
    loading: false
}

const notificationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case notificationActionTypes.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true
            };

        case notificationActionTypes.GET_ALL_SUCCEED:
            return {
                ...state,
                loading: false,
                notifications: payload
            };

        case notificationActionTypes.GET_LAST_LOGIN_SUCCEED:
            return {
                ...state,
                lastLogin: payload
            }

        default:
            return state;
    }
}

export default notificationReducer;