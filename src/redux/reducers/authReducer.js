import { authActionTypes } from "../actions/authActions";

export const authStates = {
    IDLE: "auth/idle",
    LOADING: "auth/loading",
    SUCCEED: "auth/succeed",
    FAIL: "auth/fail"
}

const initialState = {
    isAuthenticated: false,
    user: null,
    authState: authStates.IDLE,
}


const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case authActionTypes.LOAD_USER_REQUEST:
            return {
                ...state,
                authState: state.authState !== authStates.LOADING && authStates.LOADING
            };
        case authActionTypes.LOAD_USER_SUCCEED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                authState: authStates.IDLE
            };
        case authActionTypes.LOAD_USER_FAIL:
            return {
                ...initialState
            };
        case authActionTypes.LOGOUT_SUCCESS:
            return {
                ...initialState
            };

       
        default:
            return state;
    }
}

export default authReducer;