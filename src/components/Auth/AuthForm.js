import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import { createNewUser } from "./requestFunctions";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // true=login  false=signup
  // Input field values tied to refs
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  // Sign in or Sign Up when you press the submit handler
  // The user decides whether they want to sign in or sign up
  const submitHandler = function (event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // If an account already exists, sign in
    if (isLogin) {
    }
    // If we're signing up, create a new account
    if (!isLogin) {
      createNewUser(enteredEmail, enteredPassword);
    }
  }; // Runs regardless of whether isLogin is T/F

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
