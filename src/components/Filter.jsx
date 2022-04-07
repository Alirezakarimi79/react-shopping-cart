import React from "react";
import { connect } from "react-redux";

import { filterProducts, sortProducts } from "../redux/actios/productActions";

const Filter = ({
  products,
  sort,
  size,
  sortProducts,
  filterProducts,
  filteredProducts,
}) => {

  return !filteredProducts ? (
    <div>لطفا کمی صبور باشید ...</div>
  ) : (
    <div className="filter">
      <div className="filter-result"><span>محصولات:</span> {filteredProducts.length} </div>
      <div className="filter-sort">
        مرتب سازی:{" "}
        <select
          value={sort}
          onChange={(e) => sortProducts(filteredProducts, e.target.value)}
        >
          <option value="latest">آخرین</option>
          <option value="lowest">ارزان ترین</option>
          <option value="highest">گران ترین</option>
        </select>
      </div>
      <div className="filter-size">
        فیلتر{" "}
        <select
          value={size}
          onChange={(e) => filterProducts(products, e.target.value)}
        >
          <option value="">همه</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XLL</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    size: state.products.size,
    filteredProducts: state.products.filteredItems,
    sort: state.products.sort,
    products: state.products.items,
  };
};

const mapDispatchToProps = {
  filterProducts,
  sortProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
