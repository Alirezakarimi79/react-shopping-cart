import React, { Fragment, useState } from "react";
import { Fade, Zoom } from "react-reveal";
import { connect } from "react-redux";
import Modal from "react-modal/lib/components/Modal";

import { formatCurrency } from "./../utils/formatCurrency";
import { removeFromCart } from "../redux/actios/cartActions";
import { createOrder, clearOrder } from "../redux/actios/orderActions";

const Cart = ({
  cartItems,
  removeFromCart,
  createOrder,
  clearOrder,
  order,
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChangeInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const order = {
      name: formValue.name,
      email: formValue.email,
      address: formValue.address,
      cartItems,
      total: cartItems.reduce(
        (item, element) => item + element.count * element.price,
        0
      ),
    };
    createOrder(order);
    setShowCheckout(false)
  };

  const closeModal = () => {
    clearOrder();
  };

  return (
  <Fragment>
      {!cartItems ? (<div>لطفا کمی صبور باشید...</div>) : (<div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">سبد خرید خالی است</div>
      ) : (
        <div className="cart cart-header">
          محصول در سبد خرید دارید{" "}
          <span style={{ margin: "0 2px" }}> {cartItems.length} </span> شما
        </div>
      )}
      {order && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="button close-modal" onClick={closeModal}>
              x
            </button>
            <div className="order-details">
              <h3 className="success-message">.سفارش شما ثبت شده است</h3>
              <h2>سفارش {order._id}</h2>
              <ul>
                <li>
                  <div>نام:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>ایمیل:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>آدرس:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>جمع:</div>
                  <div>{formatCurrency(order.total)}</div>
                </li>
                <li>
                  <div>اقلام سبد خرید:</div>
                  <div>{order.cartItems.map((item)=>(
                    <div>{item.count} x {item.price}</div>
                  ))}</div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      )}
      <Fade left cascade>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      onClick={() => removeFromCart(item)}
                      className="button"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Fade>
      {cartItems.length !== 0 ? (
        <div className="cart">
          <div className="total">
            <div>
              جمع:{" "}
              {formatCurrency(
                cartItems.reduce(
                  (item, element) => item + element.price * element.count,
                  0
                )
              )}
            </div>
            <button
              className="button primary"
              onClick={() => setShowCheckout(true)}
            >
              خرید
            </button>
          </div>
        </div>
      ) : null}
      {showCheckout && (
        <Fade right cascade>
          <div className="cart">
            <form onSubmit={submitOrder}>
              <ul className="form-container">
                <li>
                  <label>نام و نام خانوادگی:</label>
                  <input
                    name="name"
                    type="text"
                    required
                    onChange={handleChangeInput}
                  />
                </li>
                <li>
                  <label>ایمیل:</label>
                  <input
                    name="email"
                    type="email"
                    required
                    onChange={handleChangeInput}
                  />
                </li>
                <li>
                  <label>آدرس:</label>
                  <input
                    name="address"
                    type="text"
                    required
                    onChange={handleChangeInput}
                  />
                </li>
                <li>
                  <button type="submit" className="button primary">
                    تایید
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </Fade>
      )}
    </div>)}
  </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    order: state.order.order,
  };
};

const mapDispatchToProps = {
  removeFromCart,
  createOrder,
  clearOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
