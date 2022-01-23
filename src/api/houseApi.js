import axiosClient from "./axiosClient";



class HouseApi {

    getOne(houseId) {
        return axiosClient.get(`houses/${houseId}`);
    }
}

const houseApi = new HouseApi();

export default houseApi;