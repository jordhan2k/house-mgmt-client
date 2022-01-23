import { panelModes, snackbarSeverity } from "../../utils/constants";
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
    },

    addEditPanel: {
        show: false,
        mode: "",
        currentItem: null
    },

    search: {
        keyword: "",
        results: "",
        found: ""
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

        case helperActionTypes.ADD_PANEL_OPEN:
            return {
                ...state,
                addEditPanel: {
                    show: true,
                    mode: panelModes.add
                }
            }

        case helperActionTypes.EDIT_PANEL_OPEN:
            return {
                ...state,
                addEditPanel: {
                    show: true,
                    mode: panelModes.edit,
                    currentItem: payload
                }
            }

        case helperActionTypes.ADD_EDIT_PANEL_CLOSE:
            return {
                ...state,
                addEditPanel: {
                    show: false,
                    mode: "",
                    currentItem: null
                }
            }

        case helperActionTypes.SEARCH_USER_SUCCEED:
            return {
                ...state,
                search: {
                    ...state.search,
                    keyword: payload.keyword,
                    results: payload.users,
                    found: payload.found
                }
            }
        default:
            return state;
    }
}

export default helperReducer;