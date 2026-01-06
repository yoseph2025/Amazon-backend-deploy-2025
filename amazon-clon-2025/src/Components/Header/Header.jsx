import { useContext } from "react";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../../DataProvider/DataProvider";
import { auth } from "../../Utilty/Firebase.js";

const Header = () => {
  const { state = {} } = useContext(DataContext);
  const { user = null, basket = [] } = state;

  const totalItem = basket.reduce((amount, item) => {
    return amount + (item.amount || 1);
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>

            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select>
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search product" />
            <BsSearch size={38} />
          </div>

          <div className={classes.flag_section}>
            <Link to="#" className={classes.language}>
              <img
                src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
                alt="Country Flag"
              />
              <select>
                <option value="EN">EN</option>
              </select>
            </Link>

            <Link to={user ? "#" : "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user.email.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account and Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
    </section>
  );
};

export default Header;





