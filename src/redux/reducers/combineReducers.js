import { combineReducers } from "redux";

import { productReducer } from "./productsReducer";
import { cartReducer } from "./cartReducers";

export default combineReducers({
    products: productReducer,
    cart: cartReducer
})