import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import { FadeLoader } from "react-spinners";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <FadeLoader
          color="#36d7b7"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <section className={classes.product_container}>
      {products.map((singleProduct) => (
        <ProductCard RenderAdd={ true} product={singleProduct} key={singleProduct.id} />
      ))}
    </section>
  );
};

export default Product;
