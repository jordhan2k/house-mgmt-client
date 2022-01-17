import axiosClient from "./axiosClient"

const authPaths = {
    loadUser: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    checkUsername: "/auth/check-username"
}


class AuthApi {

    loadUser() {
        return axiosClient.get(authPaths.loadUser);
    }

    login(loginForm) {
        return axiosClient.post(authPaths.login, loginForm);
    }

    register(registerForm) {
        return axiosClient.post(authPaths.register, registerForm);
    }

    checkUsername(username) {
        return axiosClient.get(`${authPaths.checkUsername}?username=${username}`);
    }
}

const authApi = new AuthApi();

export default authApi;