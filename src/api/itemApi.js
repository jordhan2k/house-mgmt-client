import axiosClient from './axiosClient';

const itemPaths = {
    base: "items"
}


class ItemApi {

    createItem(form) {
        return axiosClient.post(itemPaths.base,
            form,
            { headers: { 'content-type': 'multipart/form-data' } });
    }

    updateItem(itemId, form) {
        return axiosClient.put(`${itemPaths.base}/${itemId}`,
            form,
            { headers: { 'content-type': 'multipart/form-data' } });
    }

    deleteItem(item) {
        return axiosClient.put(`${itemPaths.base}/${item._id}/delete`, item);
    }

}

const itemApi = new ItemApi();

export default itemApi;