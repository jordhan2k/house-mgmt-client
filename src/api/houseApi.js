import axiosClient from "./axiosClient";

class HouseApi {

    createNewHouse(newHouse) {
        return axiosClient.post()
    }


}

const houseApi = new HouseApi();

export default houseApi;