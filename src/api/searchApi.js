import axiosClient from './axiosClient';

class SearchApi {
    searchByUsername(username) {
        return axiosClient.get(`search/users?username=${username}`);
    }
}

const searchApi = new SearchApi();

export default searchApi;