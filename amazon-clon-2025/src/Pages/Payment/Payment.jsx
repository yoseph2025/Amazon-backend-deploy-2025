import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/Currencyformat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utilty/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { state = {} } = useContext(DataContext);
  const { user = null, basket = [] } = state;

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalItems = basket.reduce(
    (sum, item) => sum + (item.amount || 1),
    0
  );

  const total = basket.reduce(
    (sum, item) => sum + (item.price || 0) * (item.amount || 1),
    0
  );

  const handleChange = (e) => {
    setCardError(e?.error ? e.error.message : "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !user) return;

    try {
      setProcessing(true);
      setCardError("");

      const response = await axiosInstance.post(
        `/payments/create?total=${Math.round(total * 100)}`
      );

      const clientSecret = response.data.clientSecret;

      const { paymentIntent, error } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      await setDoc(
        doc(db, "users", user.uid, "orders", paymentIntent.id),
        {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      setProcessing(false);
      navigate("/orders", { replace: true });
    } catch (err) {
      console.error(err);
      setProcessing(false);
      setCardError("Payment failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className={classes.payment_header}>
        Checkout ({totalItems}) items
      </div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest"}</div>
            <div>123 Semera</div>
            <div>Ethiopia</div>
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket.map((item, index) => (
              <ProductCard
                key={item.id || index}
                product={item}
                RenderAdd={false}
                RenderDesc={true}
                flex={true}
              />
            ))}
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detailes}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small className={classes.error}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={classes.payment_price}>
                  <div className={classes.total}>
                    <p>Total Order |</p>
                    <CurrencyFormat amount={total} />
                  </div>

                  <button
                    type="submit"
                    disabled={processing || !!cardError}
                  >
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
