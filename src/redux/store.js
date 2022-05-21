import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeWithDevTools(
    applyMiddleware(sagaMiddleware)
);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancer
);

sagaMiddleware.run(rootSaga);

export default store;