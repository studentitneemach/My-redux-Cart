import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./Reducers/productReducers";
const middileware = [thunk]
const initialState = {};
const compaseEnhancer =  window._REDUX_DEVTOOLS_EXTENTION_COMPOSE || compose  ;

const store = createStore(combineReducers({
    products : productsReducer,
}),
initialState,
compaseEnhancer(applyMiddleware(...middileware))
);

export default store ; 