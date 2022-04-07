import serviceApi from "../../services/serviceApi";
import { productTypes } from "../constants/types";

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await serviceApi.get("/products");
     dispatch({
      type: productTypes.FETCH_PRODUCTS,
      payload: response.data,
    });
  };
};

export const filterProducts = (products, size) => {
  return (dispatch) => {
    dispatch({
      type: productTypes.FILTER_PRODUCTS_BY_SIZE,
      payload: {
        size,
        items:
          size === ""
            ? products
            : products.filter(
                (product) => product.availableSizes.indexOf(size) >= 0
              ),
      },
    });
  };
};

export const sortProducts = (filterProducts, sort) => {
  const sortedProducts = filterProducts.slice();
    sortedProducts.sort((item, element) =>
      sort === "latest"
        ? item._id > element._id
          ? 1
          : -1
        : sort === "lowest"
        ? item.price > element.price
          ? 1
          : -1
        : sort === "highest"
        ? item.price < element.price
          ? 1
          : -1
        : null
    );
  return (dispatch) => {
    dispatch({
      type: productTypes.ORDER_PRODUCTS_BY_PRICE,
      payload: {
        sort,
        items: sortedProducts,
      },
    });
  };
};

