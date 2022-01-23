export const houseActionTypes = {
    GET_REQUEST: "houses/get/request",
    GET_SUCCEED: "houses/get/succeed",

    GET_GUEST_REQUEST: "houses/guest/get/request",
    GET_GUEST_SUCCEED: "houses/guest/get/succeed",
};

export const houseType = {
    mine: "house/mine",
    guest: "house/guest"
}

export const getHouseRequest = (houseId, type) => ({
    type: houseActionTypes.GET_REQUEST,
    payload: { houseId, type }
});

export const getHouseSucceed = (house, type) => ({
    type: houseActionTypes.GET_SUCCEED,
    payload: { house, type }
});

export const getGuestRequest = (guestId) => ({
    type: houseActionTypes.GET_GUEST_REQUEST,
    payload: guestId
});

export const getGuestSucceed = guest => ({
    type: houseActionTypes.GET_GUEST_SUCCEED,
    payload: guest
})

export const itemActionTypes = {
    GET_ALL_REQUEST: "items/getAll/request",
    GET_ALL_SUCCEED: "items/getAll/succeed",
    GET_ALL_FAIL: "items/getAll/fail",

    CREATE_REQUEST: "items/create/request",
    CREATE_SUCCEED: "items/create/succeed",

    UPDATE_REQUEST: "items/update/request",
    UPDATE_SUCCEED: "items/update/succeed",

    DELETE_REQUEST: "items/delete/request",
    DELETE_SUCCEED: "items/delete/succeed"
};

export const getAllItemsRequest = houseId => {
    console.log("get all items", houseId)
    return {
        type: itemActionTypes.GET_ALL_REQUEST,
        payload: houseId
    }
};

export const getAllItemsSucceed = items => ({
    type: itemActionTypes.GET_ALL_SUCCEED,
    payload: items
});

export const createItemRequest = form => ({
    type: itemActionTypes.CREATE_REQUEST,
    payload: form
});

export const createItemSucceed = item => ({
    type: itemActionTypes.CREATE_SUCCEED,
    payload: item
});

export const updateItemRequest = (itemId, form) => ({
    type: itemActionTypes.UPDATE_REQUEST,
    payload: {
        itemId,
        form
    }
});

export const updateItemSucceed = item => ({
    type: itemActionTypes.UPDATE_SUCCEED,
    payload: item
});

export const deleteItemRequest = item => ({
    type: itemActionTypes.DELETE_REQUEST,
    payload: item
});

export const deleteItemSucceed = itemId => ({
    type: itemActionTypes.DELETE_SUCCEED,
    payload: itemId
});