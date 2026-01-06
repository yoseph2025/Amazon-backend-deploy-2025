import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utilty/Firebase";
import { DataContext } from "../../DataProvider/DataProvider";
import classes from "./Order.module.css";
import ProductCard from "../../Components/Product/ProductCard";

const Order = () => {
  const { state } = useContext(DataContext);
  const { user } = state || {};
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection(users)
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {});
      setOrders.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 && <p style={{padding:"20px"}}>No orders found.</p>}

          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: (eachOrder?.id)</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} produ={order} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Order;
