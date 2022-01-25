import { combineReducers } from "redux";
import authReducer from "./authReducer";
import helperReducer from "./helperReducer";
import houseReducer from "./houseReducer";
import notificationReducer from "./notificationReducer";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    helper: helperReducer,
    house: houseReducer,
    form: formReducer
});

export default rootReducer;