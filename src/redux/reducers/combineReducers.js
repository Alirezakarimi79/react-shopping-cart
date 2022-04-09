import { combineReducers } from "redux";

import { productReducer } from "./productsReducer";
import { cartReducer } from "./cartReducers";
import { orderReducer } from './orderReducer';

export default combineReducers({
    products: productReducer,
    cart: cartReducer,
    order: orderReducer
})