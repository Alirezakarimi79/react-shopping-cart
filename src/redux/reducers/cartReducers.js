import { cartTypes } from "../constants/types";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems"), "[]") },
  action
) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case cartTypes.REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
