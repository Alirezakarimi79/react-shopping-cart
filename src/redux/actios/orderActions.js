import { orderTypes } from "../constants/types";
import serviceApi from "../../services/serviceApi";

export const createOrder = (order) => {
  return async (dispatch) => {
    const response = await serviceApi.post("/orders", order);
    dispatch({
      type: orderTypes.CREATE_ORDER,
      payload: response.data,
    });
    localStorage.clear("cartItems");
    dispatch({ type: orderTypes.CLEAR_CART });
  };
};

export const clearOrder = () => {
  return (dispatch) => {
    dispatch({ type: orderTypes.CLEAR_ORDER });
  };
};
