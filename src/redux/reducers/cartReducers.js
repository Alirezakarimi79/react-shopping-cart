import { cartTypes } from "../constants/types";
import { orderTypes } from './../constants/types';

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case cartTypes.REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    case orderTypes.CLEAR_CART:
      return {cartItems: []}
    default:
      return state;
  }
};
