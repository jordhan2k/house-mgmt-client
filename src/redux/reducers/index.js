import { combineReducers } from "redux";
import authReducer from "./authReducer";
import helperReducer from "./helperReducer";
import notificationReducer from "./notificationReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    helper: helperReducer
    
});

export default rootReducer;