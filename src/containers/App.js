import React, { useState } from "react";

import Products from "../components/Products";
import Filter from "../components/Filter";
import Cart from "./../components/Cart";

const App = () => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (product) => {
    const items = cartItems.slice();
    let alreadyInCart = false;
    items.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      items.push({ ...product, count: 1 });
    }
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const removeFromCart = (product) => {
    const items = cartItems.slice();
    setCartItems(items.filter((item) => item._id !== product._id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(items.filter((item) => item._id !== product._id))
    );
  };

  const createOrder = (order) => {
    alert("Need To Save Order For " + order.name);
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">فروشگاه آنلاین لباس</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>تمام حقوق محفوظ است</footer>
    </div>
  );
};

export default App;
