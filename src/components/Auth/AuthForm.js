import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import { createNewUser } from "./requestFunctions";

const AuthForm = () => {
  // isLogin= true (LOGIN MODE)  isLogin=false (SIGN UP MODE)
  const [isLogin, setIsLogin] = useState(true);

  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  // This submit handler should run regardless of what isLogin equals
  const submitHandler = function (event) {
    event.preventDefault();
    // Get entered data inside input fields via refs or useState
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // We'll skip validation b/c it's not related to the Authentication topic
    if (isLogin) {
    }
    if (!isLogin) {
      createNewUser(enteredEmail,enteredPassword)
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
