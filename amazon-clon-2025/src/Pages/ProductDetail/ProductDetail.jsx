import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";
import { FadeLoader } from "react-spinners";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <FadeLoader
            color="#36d7b7"
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
          <p>Loading product details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductCard
        product={product}
        flex={true}
        RenderDesc={true}
        RenderAdd={true}
      />
    </Layout>
  );
};

export default ProductDetail;
