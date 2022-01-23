import { all, put, takeLatest } from 'redux-saga/effects'
import commentApi from '../../api/commentApi';
import { addCommentSucceed, changeLikeTypes, commentActionTypes, deleteCommentSucceed, editCommentSucceed, fetchCommentsSucceed } from '../actions/commentActions'

function* fetchCommentsHandler(action) {
    const houseId = action.payload;
    console.log(houseId);
    try {
        const response = yield commentApi.fetchHouseComments(houseId);
        console.log(response)
        if (response.data.success) {
            yield put(fetchCommentsSucceed(response.data.house, response.data.comments));
        }
    } catch (error) {
        console.log(error);
    }
}

function* fetchCommentsWatcher(action) {
    yield takeLatest(commentActionTypes.COMMENT_FETCH_REQUEST, fetchCommentsHandler);
}

function* addCommentHandler(action) {
    const comment = action.payload;
    try {
        const response = yield commentApi.addComment(comment);
        console.log(response);
        if (response.data.success) {
            yield put(addCommentSucceed(response.data.comment));

        }
    } catch (error) {
        console.log(error);
    }
}

function* addCommentWatcher() {
    yield takeLatest(commentActionTypes.COMMENT_ADD_REQUEST, addCommentHandler);
}

function* editCommitHandler(action) {
    const editedComment = action.payload;
    console.log(editedComment);
    try {
        const response = yield commentApi.editComment(editedComment);

        if (response.data.success) {
            yield put(editCommentSucceed(response.data.comment))
        }
    } catch (error) {
        console.log(error)
    }
}

function* editCommentWatcher() {
    yield takeLatest(commentActionTypes.COMMENT_EDIT_REQUEST, editCommitHandler);
}

function* changeLikeHandler(action) {
    const { commentId, type } = action.payload;
    try {
        let response;
        if (type === changeLikeTypes.like) {
            response = yield commentApi.likeComment(commentId);
        }
        if (type === changeLikeTypes.unlike) {
            response = yield commentApi.unlikeComment(commentId);
        }
        if (response.data.success) {
            yield put(editCommentSucceed(response.data.comment));
        }
    } catch (error) {
        console.log(error)
    }
}

function* changeLikeWatcher() {
    yield takeLatest(commentActionTypes.CHANGE_LIKE_REQUEST, changeLikeHandler);
}

function* deleteCommentHandler(action) {
    const comment = action.payload;
    try {
        const response = yield commentApi.deleteComment(comment);
        if (response.data.success) {
            yield put(deleteCommentSucceed({ commentId: response.data.commentId, level: response.data.level }));
        }
    } catch (error) {
        console.log(error);
    }
}

function* deleteCommentWatcher() {
    yield takeLatest(commentActionTypes.COMMENT_DELETE_REQUEST, deleteCommentHandler);
}

function* commentSaga() {
    yield all([
        addCommentWatcher(),
        editCommentWatcher(),
        deleteCommentWatcher(),
        changeLikeWatcher(),
        fetchCommentsWatcher()
    ])
}

export default commentSaga;