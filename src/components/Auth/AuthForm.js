import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import signup_login from "./requests/signup_login";
import { useCustomContext } from "../store/auth-context";
const AuthForm = () => {
  // auth-context.js imported values and methods:
  const { login, logout, token, isLoggedIn } = useCustomContext();
  const [isLoggingIn, setIsLoggingIn] = useState(true); // true=login  false=signup
  // Input field values tied to refs
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  // Sign in or Sign Up when you press the submit handler (depends on what user opts to do)
  const submitHandler = async function (event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //# If an account already exists, login using the method from our AuthContext file
    if (isLoggingIn) {
      // Login to Firebase site + change a state value in our authContext file
      const responsePayload = await signup_login(
        enteredEmail,
        enteredPassword,
        "login"
      );
      // Update the auth-context.js state values
      if (!responsePayload) return; // guards vs crashes
      // Update context file
      const expireTime = new Date(
        // current time + response payload expiry time in seconds * 1000 to convert to ms
        new Date().getTime() + Number(responsePayload.expiresIn) * 1000
      );
      login(responsePayload.idToken, expireTime); // changes isLoggedIn & idToken
      console.log("logged in! Here's my payload:", responsePayload);
    }
    //@ If we're signing up, create a new account
    if (!isLoggingIn) {
      // Sign up using our dedicated function for doing so on Firebase:
      const responsePayload = await signup_login(
        enteredEmail,
        enteredPassword,
        "signup"
      );
      if (!responsePayload) return; // guards vs crashes
      // Update context file
      const expireTime = new Date(
        // current time + response payload expiry time in seconds * 1000 to convert to ms
        new Date().getTime() + Number(responsePayload.expiresIn) * 1000 //! typo
      );
      login(responsePayload.idToken, expireTime); // changes isLoggedIn & idToken
      console.log("signed up! Here's my payload:", responsePayload);
    }
  }; // Runs regardless of whether isLoggingIn is T/F

  const switchAuthModeHandler = () => {
    setIsLoggingIn((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLoggingIn ? "Login" : "Sign Up"}</h1>
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
          <button>{isLoggingIn ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLoggingIn ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

//~ COLOR COORDINATION
//@ Sign Up with Email and Passsword
//# Log in with Email and Password
//% Logout
//
