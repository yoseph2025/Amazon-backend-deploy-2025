import React from "react";
import { Link } from "react-router-dom";
import classes from "./Category.module.css";

const CategoryCardNew = ({ data }) => {
  if (!data) return null;

  const { name, title, image } = data;

  return (
    <div className={classes.category}>
      <Link to={`/category/${name}`}>
        <span>
          <h2>{title}</h2>
        </span>
        <img src={image} alt={title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCardNew;
