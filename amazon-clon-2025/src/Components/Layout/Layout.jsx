import React from "react";
import Header from "../Header/Header"; // Make sure this path is correct
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
