import axiosClient from "./axiosClient";


class UserApi {
    getById(userId) {
        return axiosClient.get(`users/${userId}`);
    }
}

const userApi = new UserApi();

export default userApi;