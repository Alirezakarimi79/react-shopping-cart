import { productTypes } from "../constants/types";

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case productTypes.FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload
      } ;
      case productTypes.FILTER_PRODUCTS_BY_SIZE:
        return {
          ...state,
          size: action.payload.size,
          filteredItems: action.payload.items,
        };
      case productTypes.ORDER_PRODUCTS_BY_PRICE:
        return {
          ...state,
          sort: action.payload.sort,
          filteredItems: action.payload.items,
        };
    default:
      return state;
  }
};
