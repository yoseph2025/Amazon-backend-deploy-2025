import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";

const Results = () => {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category / {categoryName}</p>

        <div className={classes.product_container}>
          {results.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              productDesc={false}
              RenderAdd={true}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Results;
