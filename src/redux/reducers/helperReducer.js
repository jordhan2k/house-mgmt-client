import { helperActionTypes } from "../actions/helperActions";

const initialState = {
    snackbar: {
        show: false,
        message: "",
        severity: ""
    },

    spinner: {
        show: false,
        message: ""
    }

}

const helperReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case helperActionTypes.SNACKBAR_OPEN:
            return {
                ...state,
                snackbar: {
                    show: true,
                    message: payload.message,
                    severity: payload.severity
                }
            }

        case helperActionTypes.SNACKBAR_CLOSE:
            return {
                ...state,
                snackbar: {
                    show: false,
                    message: "",
                    severity: ""
                },
            };

        case helperActionTypes.SPINNER_OPEN:
            return {
                ...state,
                spinner: {
                    show: true,
                    message: payload.message
                }
            }

        case helperActionTypes.SPINNER_CLOSE:
            return {
                ...state,
                spinner: {
                    show: false,
                    message: ""
                }
            }

        default:
            return state;

    }



}

export default helperReducer;