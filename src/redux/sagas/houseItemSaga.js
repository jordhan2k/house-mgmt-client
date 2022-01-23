import { all, put, takeLatest } from "redux-saga/effects";
import houseApi from "../../api/houseApi";
import itemApi from "../../api/itemApi";
import userApi from "../../api/userApi";
import { snackbarSeverity } from "../../utils/constants";
import { openSnackbar } from "../actions/helperActions";
import { createItemSucceed, deleteItemSucceed, getGuestSucceed, getHouseRequest, getHouseSucceed, houseActionTypes, houseType, itemActionTypes, updateItemSucceed } from "../actions/houseItemActions";

function* getHouseHandler(action) {
    const { houseId, type } = action.payload;

    try {
        const response = yield houseApi.getOne(houseId);
        if (response.data.success) {
            yield put(getHouseSucceed(response.data, type));
        }
    } catch (error) {
        console.log(error);
    }
}

function* getHouseWatcher() {
    yield takeLatest(houseActionTypes.GET_REQUEST, getHouseHandler);
}


function* createItemHandler(action) {
    const form = action.payload;
    try {
        const response = yield itemApi.createItem(form);
        if (response.data.success) {
            yield put(createItemSucceed(response.data.item));
            yield put(openSnackbar({
                message: "Hooray! Item created!",
                severity: snackbarSeverity.success
            }));
        }
    } catch (error) {
        console.log(error);
        yield put(openSnackbar({
            message: "Oops! Something happened! Plz try again!",
            severity: snackbarSeverity.error
        }));
    }
}

function* createItemWatcher() {
    yield takeLatest(itemActionTypes.CREATE_REQUEST, createItemHandler);
}

function* updateItemHandler(action) {
    const { itemId, form } = action.payload;
    console.log(form)
    try {
        const response = yield itemApi.updateItem(itemId, form);
        if (response.data.success) {
            yield put(updateItemSucceed(response.data.item));
            yield put(openSnackbar({
                message: response.data.message,
                severity: snackbarSeverity.success
            }));
        }
    } catch (error) {
        console.log(error);
        yield put(openSnackbar({
            message: "Something happened! Cannot update your items",
            severity: snackbarSeverity.error
        }));
    }
}

function* updateItemWatcher() {
    yield takeLatest(itemActionTypes.UPDATE_REQUEST, updateItemHandler);
}

function* deleteItemHandler(action) {
    const item = action.payload;
    console.log("Hello delete item saga")
    console.log(item);
    try {
        const response = yield itemApi.deleteItem(item);
        console.log(response);
        if (response.data.success) {
            yield put(deleteItemSucceed(response.data.itemId));
            yield put(openSnackbar({
                message: response.data.message,
                severity: snackbarSeverity.success
            }));
        }
    } catch (error) {
        yield put(openSnackbar({
            message: error,
            severity: snackbarSeverity.error
        }));
    }
}

function* deleteItemWatcher() {
    yield takeLatest(itemActionTypes.DELETE_REQUEST, deleteItemHandler);
}

function* fetchGuestUserHandler(action) {
    const guestId = action.payload;
    try {
        const response = yield userApi.getById(guestId);
        console.log(response);
        if (response.data.success) {
            yield put(getGuestSucceed(response.data.user));
            yield put(getHouseRequest(response.data.user.houses[0], houseType.guest));
        }
    } catch (error) {
        console.log(error);
    }
}

function* fetchGuestUserWatcher() {
    yield takeLatest(houseActionTypes.GET_GUEST_REQUEST, fetchGuestUserHandler);
}
function* houseItemSaga() {
    yield all([
        getHouseWatcher(),
        createItemWatcher(),
        deleteItemWatcher(),
        updateItemWatcher(),
        fetchGuestUserWatcher()
    ]);
}

export default houseItemSaga;
