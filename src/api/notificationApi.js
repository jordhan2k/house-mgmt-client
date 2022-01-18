import axiosClient from "./axiosClient";

const notificationPaths = {
    base: "notifications/",
    lastLogin: "notifications/last-login"
}

class NotificationApi {

    getAllNotifications() {
        return axiosClient.get(notificationPaths.base);
    }

    getLastLogin() {
        return axiosClient.get(notificationPaths.lastLogin);
    };

    modifyNotification(id, action) {
        return axiosClient.put(`${notificationPaths.basebase}/${id}/${action}`)
    };
}

const notificationApi = new NotificationApi();

export default notificationApi;