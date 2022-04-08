import { cartTypes } from "../constants/types.js";

export const addToCart = (product) => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExist = false;
    cartItems.forEach((element) => {
      if (element._id === product._id) {
        alreadyExist = true;
        element.count++;
      }
    });
    if (!alreadyExist) {
      cartItems.push({ ...product, count: 1 });
    }
    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
};

export const removeFromCart = (product) => {
  return (dispatch, getState) => {
    let cartItems = getState().cart.cartItems.slice();
    // let alreadyExist = true;
    let element = cartItems.find((item) => item._id == product._id);
    if (element.count <= 1) {
      cartItems = cartItems.filter((item) => item._id != element._id);
    } else {
      element.count--;
    }
    console.log(element)
    console.log(cartItems);
    dispatch({
      type: cartTypes.REMOVE_FROM_CART,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
};

// const filteredItems = cartItems.filter((item) => item._id !== product._id);
// cartItems.forEach((element) => {
//   if (element._id === product._id) {
//     if (element.count === 1) {
//      return cartItems.filter((item) => item._id !== product._id)
//     } else {
//       return element.count--;
//     }
//   }
// });
