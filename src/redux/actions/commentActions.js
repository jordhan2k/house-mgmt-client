export const commentActionTypes = {

    COMMENT_FETCH_REQUEST: "comments/fetch/request",
    COMMENT_FETCH_SUCCEED: "comments/fetch/succeed",

    COMMENT_ADD_REQUEST: "comments/add/request",
    COMMENT_ADD_SUCCEED: "comments/add/succeed",

    COMMENT_EDIT_REQUEST: "comments/edit/request",
    COMMENT_EDIT_SUCCEED: "comments/edit/succeed",

    COMMENT_DELETE_REQUEST: "comments/delete/request",
    COMMENT_DELETE_SUCCEED: "comments/delete/succeed",

    CHANGE_LIKE_REQUEST: "comments/like/change/request",
    CHANGE_LIKE_SUCCEED: "comments/like/change/succeed",

    CHANGE_ACTIVE_COMMENT: "comments/active/change"
};

export const changeLikeTypes = {
    like: "like",
    unlike: "unlike"
}

export const fetchCommentsRequest = houseId => ({
    type: commentActionTypes.COMMENT_FETCH_REQUEST,
    payload: houseId
});

export const fetchCommentsSucceed = (house, comments) => ({
    type: commentActionTypes.COMMENT_FETCH_SUCCEED,
    payload: { house, comments }
});

export const addCommentRequest = comment => ({
    type: commentActionTypes.COMMENT_ADD_REQUEST,
    payload: comment
});

export const addCommentSucceed = comment => ({
    type: commentActionTypes.COMMENT_ADD_SUCCEED,
    payload: comment
});

export const editCommentRequest = editedComment => ({
    type: commentActionTypes.COMMENT_EDIT_REQUEST,
    payload: editedComment
});

export const editCommentSucceed = editedComment => ({
    type: commentActionTypes.COMMENT_EDIT_SUCCEED,
    payload: editedComment
});

export const changeLikeRequest = (commentId, type) => ({
    type: commentActionTypes.CHANGE_LIKE_REQUEST,
    payload: {
        commentId,
        type
    }
});

export const deleteCommentRequest = comment => ({
    type: commentActionTypes.COMMENT_DELETE_REQUEST,
    payload: comment
});

export const deleteCommentSucceed = commentId => ({
    type: commentActionTypes.COMMENT_DELETE_SUCCEED,
    payload: commentId
});

export const changeActiveComment = (id, mode) => ({
    type: commentActionTypes.CHANGE_ACTIVE_COMMENT,
    payload: { id, mode }
})