import { commentActionTypes } from "../actions/commentActions";
import { houseActionTypes, houseType, itemActionTypes } from "../actions/houseItemActions";

const initialState = {
    myHouse: null,
    imagePrefix: null,

    currentGuest: null,
    currentGuestHouse: null,

    comments: {
        activeComment: null,
        mode: "",
        targetedHouse: null,
        comments: []
    }
};

const houseReducer = (state = initialState, action) => {
    const { type, payload } = action;
    let commentArray = [];
    switch (type) {
        case houseActionTypes.GET_SUCCEED:
            return {
                ...state,
                myHouse: payload.type === houseType.mine ? payload.house.house : state.myHouse,
                imagePrefix: payload.house.imagePrefix,
                currentGuestHouse: payload.type === houseType.guest ? payload.house.house : state.currentGuestHouse
            };

        case itemActionTypes.CREATE_SUCCEED:
            return {
                ...state,
                myHouse: {
                    ...state.myHouse,
                    items: [...state.myHouse.items, payload]
                }
            }

        case itemActionTypes.DELETE_SUCCEED:
            return {
                ...state,
                myHouse: {
                    ...state.myHouse,
                    items: state.myHouse.items.filter(item => item._id !== payload)
                }
            }

        case itemActionTypes.UPDATE_SUCCEED:
            return {
                ...state,
                myHouse: {
                    ...state.myHouse,
                    items: state.myHouse.items.map(item => item._id === payload._id ? payload : item)
                }
            }

        case houseActionTypes.GET_GUEST_SUCCEED:
            return {
                ...state,
                currentGuest: payload
            }

        case commentActionTypes.COMMENT_FETCH_SUCCEED:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    comments: payload.comments,
                    targetedHouse: payload.house
                }
            }

        case commentActionTypes.COMMENT_ADD_SUCCEED:


            if (payload.level === 1) {
                commentArray = [
                    payload.about === state.comments.targetedHouse && payload,
                    ...state.comments.comments
                ]
            }
            if (payload.level === 2) {
                commentArray = state.comments.comments.map(parentComment => {
                    if (parentComment._id === payload.repliedTo) {
                        return {
                            ...parentComment,
                            replies: [
                                ...parentComment.replies,
                                payload
                            ]
                        }
                    } else {
                        return parentComment;
                    }
                });
            }

            return {
                ...state,
                comments: {
                    ...state.comments,
                    comments: [...commentArray]
                }
            }

        case commentActionTypes.COMMENT_EDIT_SUCCEED:
            if (payload.level === 1) {
                commentArray = state.comments.comments.map(comment => comment._id === payload._id
                    ? payload
                    : comment)
            }
            if (payload.level === 2) {
                commentArray = state.comments.comments.map(parentComment => ({
                    ...parentComment,
                    replies: parentComment.replies.map(child => child._id === payload._id ? payload : child)
                }))
            }

            return {
                ...state,
                comments: {
                    ...state.comments,
                    comments: [...commentArray]
                }
            }

        case commentActionTypes.COMMENT_DELETE_SUCCEED:
            if (payload.level === 1) {
                commentArray = state.comments.comments.filter(comment => comment._id !== payload.commentId);
            }
            if (payload.level === 2) {
                commentArray = state.comments.comments.map(parentComment => ({
                    ...parentComment,
                    replies: parentComment.replies.filter(comment => comment._id !== payload.commentId)
                }))
            }
            return {
                ...state,
                comments: {
                    ...state.comments,
                    comments: [...commentArray]
                }
            }

        case commentActionTypes.CHANGE_ACTIVE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    activeComment: payload.id,
                    mode: payload.mode
                }
            }

        default:
            return state;
    }
}

export default houseReducer;
