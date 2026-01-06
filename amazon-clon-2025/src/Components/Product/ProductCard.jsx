import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currencyformat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { type } from "../../Utilty/ActionType.js";
import { DataContext } from "../../DataProvider/DataProvider";
import { useContext } from "react";

const ProductCard = ({ product, flex, RenderDesc, RenderAdd }) => {
  const { image, rating = {}, title, id, price, description } = product;
  const { rate = 0, count = 0 } = rating;

  const { state, dispatch } = useContext(DataContext);

  const addtocart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: { image, rating, title, id, price, description },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>

        {RenderDesc && (
          <p className={classes.description}>
            {description || "No description available"}
          </p>
        )}

        <div className={classes.rating}>
          <Rating value={rate} precision={0.1} />
          <small>{count}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>
        {RenderAdd && (
          <button className={classes.button} onClick={addtocart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
