import { all, put, takeLatest } from "redux-saga/effects";
import searchApi from "../../api/searchApi";
import { helperActionTypes, searchUsersSucceed } from "../actions/helperActions";

function* searchUserHandler(action) {
    const keyword = action.payload;
    console.log("search saga", keyword);
    try {
        const response = yield searchApi.searchByUsername(keyword);
        if (response.data.success) {
            yield put(searchUsersSucceed(response.data.result));
        }
    } catch (error) {
        console.log(error);
    }

}

function* searchUserWatcher() {
    yield takeLatest(helperActionTypes.SEARCH_USER_REQUEST, searchUserHandler);
}

function* searchSaga() {
    yield all([
        searchUserWatcher()
    ])
}


export default searchSaga;