import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./SignUp.module.css";
import { auth } from "../../Utilty/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../DataProvider/DataProvider";
import { type } from "../../Utilty/ActionType";
import { ClipLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });

  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (e.target.name === "signin") {
        setLoading((prev) => ({ ...prev, signin: true }));

        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });

        navigate(location.state?.redirect || "/");
      } else {
        setLoading((prev) => ({ ...prev, signup: true }));

        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });

        navigate(location.state?.redirect || "/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ signin: false, signup: false });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://logovent.com/blog/wp-content/uploads/2024/05/The-Arrow-Smile-Logo-from-2000-till-Present.jpg"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign in</h1>

        {location.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {location.state.msg}
          </small>
        )}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signin ? <ClipLoader size={15} /> : "Sign in"}
          </button>
        </form>

        <p>
          By signing in, you agree to the Amazon fake clone Conditions of Use
          and Sale.
        </p>

        <button
          type="button"
          onClick={authHandler}
          name="signup"
          className={classes.login_registerionButton}
        >
          {loading.signup ? (
            <ClipLoader size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && <small className={classes.error}>{error}</small>}
      </div>
    </section>
  );
};

export default Auth;
