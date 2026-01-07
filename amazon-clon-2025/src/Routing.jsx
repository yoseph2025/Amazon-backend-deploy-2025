import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Cart/Cart";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51SglfYDFWS6IMntt9HyGIXwg1JBL6m2XMPCYceItS319gZvHUvldu84FTcMNxBcEns4F5HjHTFSRawRUxXJUTPNc00P0JzsmtD"
);

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/payments"
        element={
          <ProtectedRoute msg="You must log in to pay" redirect="/payments">
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
        }
      />
      <Route path="/orders" element={<Order />} />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Routing;
