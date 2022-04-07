import React, { useState, useEffect } from "react";
import { Fade, Zoom } from "react-reveal";
import Modal from "react-modal/lib/components/Modal";
import { connect } from "react-redux";

import { formatCurrency } from "./../utils/formatCurrency";
import { fetchProducts } from "../redux/actios/productActions";

const Products = ({ products, addToCart, fetchProducts }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };

  return (
    <div>
      <Fade bottom cascade>
        {!products ? (
          <div>لطفا کمی صبور باشید</div>
        ) : (
          <ul className="products">
            {products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a href="#" onClick={() => openModal(product)}>
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => addToCart(product)}
                    >
                      اضافه به سبد خرید
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal button" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  اندازه های موجود:{" "}
                  {product.availableSizes.map((size) => (
                    <span>
                      <button className="button">{size}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      addToCart(product);
                      closeModal();
                    }}
                  >
                    اضافه کردن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.filteredItems,
  };
};

const mapDispatchToProps = {
  fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
