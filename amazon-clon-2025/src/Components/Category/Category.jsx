import React from "react";
import { categoriesInfo } from "./CategoryInfo";
import CategoryCardNew from "./CategoryCardNew";
import classes from "./Category.module.css";

const Category = () => {
  return (
    <section className={classes.category_container}>
      {categoriesInfo.map((infos, index) => (
        <CategoryCardNew key={index} data={infos} />
      ))}
    </section>
  );
};

export default Category;
