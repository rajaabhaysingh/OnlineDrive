import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import persistState from "redux-localstorage";

import rootReducer from "../reducers";

const enhancer = compose(applyMiddleware(thunk), persistState());

const store = createStore(rootReducer, enhancer);

export default store;
