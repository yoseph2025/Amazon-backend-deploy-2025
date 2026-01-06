import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/Currencyformat/CurrencyFormat";
import { DataContext } from "../../DataProvider/DataProvider";
import classes from "./Cart.module.css";
import { type } from "../../Utilty/ActionType";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Cart = () => {
  const { state = {}, dispatch } = useContext(DataContext);
  const { basket = [], user } = state;

  const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

  const increment = (item) => {
    dispatch({ type: type.ADD_TO_BASKET, item });
  };

  const decrement = (id) => {
    dispatch({ type: type.REMOVE_FROM_BASKET, id });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello {user?.email || "Guest"}</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            basket.map((item) => (
              <section key={item.id} className={classes.cart_product}>
                <ProductCard
                  product={item}
                  RenderAdd={false}
                  RenderDesc={true}
                  flex
                />

                <div className={classes.btn_container}>
                  <button onClick={() => increment(item)}>
                    <IoIosArrowUp />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => decrement(item.id)}>
                    <IoIosArrowDown />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket.length > 0 && (
          <div className={classes.subtotal}>
            <p>Subtotal ({basket.length} items)</p>
            <CurrencyFormat amount={total} />
            <Link to="/payments">Proceed to Checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
