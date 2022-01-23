import { combineReducers } from "redux";
import authReducer from "./authReducer";
import helperReducer from "./helperReducer";
import houseReducer from "./houseReducer";
import notificationReducer from "./notificationReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    helper: helperReducer,
    house: houseReducer
});

export default rootReducer;