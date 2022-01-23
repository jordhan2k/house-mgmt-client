export const helperActionTypes = {
    SNACKBAR_OPEN: "helper/snackbar/open",
    SNACKBAR_CLOSE: "helper/snackbar/close",

    SPINNER_OPEN: "helper/spinner/open",
    SPINNER_CLOSE: "helper/spinner/close",

    ADD_PANEL_OPEN: "panel/add/open",
    EDIT_PANEL_OPEN: "panel/edit/open",

    ADD_EDIT_PANEL_CLOSE: "panel/addEdit/close",

    SEARCH_USER_REQUEST: "search/users/request",
    SEARCH_USER_SUCCEED: "search/users/succeed"
}

export const openSnackbar = payload => ({
    type: helperActionTypes.SNACKBAR_OPEN,
    payload: payload
});

export const closeSnackbar = () => ({
    type: helperActionTypes.SNACKBAR_CLOSE
});

export const openSpinner = () => ({
    type: helperActionTypes.SPINNER_OPEN
});

export const closeSpinner = () => ({
    type: helperActionTypes.SPINNER_CLOSE
});

export const openAddPanel = () => ({
    type: helperActionTypes.ADD_PANEL_OPEN
});

export const openEditPanel = item => ({
    type: helperActionTypes.EDIT_PANEL_OPEN,
    payload: item
});

export const closeAddEditPanel = () => ({
    type: helperActionTypes.ADD_EDIT_PANEL_CLOSE
});

export const searchUsersRequest = keyword => ({
    type: helperActionTypes.SEARCH_USER_REQUEST,
    payload: keyword
});

export const searchUsersSucceed = result => ({
    type: helperActionTypes.SEARCH_USER_SUCCEED,
    payload: result
})
