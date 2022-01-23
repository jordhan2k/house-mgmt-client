import moment from "moment";

export const isAuthorized = (location, params, user) => {
    const route = location.pathname.split("/")[1];
    const guestId = route === "users" && params.id;
    return (route === "dashboard" || (route === "users" && guestId === user._id))
}

export const expiresSoon = (item) => {
    return moment(item.expireDate)
        .isAfter(moment())
        && moment(item.expireDate)
            .isBefore(moment()
                .add(7, "days"))
        && !item.isDeleted;
}

export const match = (item, keyword) => {
    return (item.name
        .toLowerCase()
        .includes(keyword.trim())
        || item.location
            .toLowerCase()
            .includes(keyword.trim()))
        && !item.isDeleted
}