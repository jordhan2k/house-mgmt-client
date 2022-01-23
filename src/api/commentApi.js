import axiosClient from "./axiosClient";

const commentPath = "comments"

class CommentApi {

    fetchHouseComments(houseId) {
        return axiosClient.get(`houses/${houseId}/comments`);
    }

    addComment(comment) {
        return axiosClient.post(commentPath, comment);
    }

    likeComment(commentId) {
        return axiosClient.put(`${commentPath}/${commentId}/like`);
    }

    unlikeComment(commentId) {
        return axiosClient.put(`${commentPath}/${commentId}/unlike`);
    }

    editComment(editedComment) {
        return axiosClient.put(`${commentPath}/${editedComment._id}`, editedComment);
    }

    deleteComment(comment) {
        return axiosClient.put(`${commentPath}/${comment._id}/delete`, comment);
    }
}

const commentApi = new CommentApi();

export default commentApi;