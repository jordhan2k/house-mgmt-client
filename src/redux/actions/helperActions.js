export const helperActionTypes = {
    SNACKBAR_OPEN: "helper/snackbar/open",
    SNACKBAR_CLOSE: "helper/snackbar/close",

    SPINNER_OPEN: "helper/spinner/open",
    SPINNER_CLOSE: "helper/spinner/close",
}

export const openSnackbar = () => ({
    type: helperActionTypes.SNACKBAR_OPEN
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