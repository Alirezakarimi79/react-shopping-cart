import { orderTypes } from "../constants/types";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderTypes.CREATE_ORDER:
      return { ...state, order: action.payload };
    case orderTypes.CLEAR_ORDER:
      return { ...state, order: null };
    default:
      return state;
  }
};
