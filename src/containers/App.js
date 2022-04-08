import React from "react";

import Products from "../components/Products";
import Filter from "../components/Filter";
import Cart from "./../components/Cart";

const App = () => {
  return (
    <div className="grid-container">
      <header>
        <a href="/">فروشگاه آنلاین لباس</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      <footer>تمام حقوق محفوظ است</footer>
    </div>
  );
};

export default App;
