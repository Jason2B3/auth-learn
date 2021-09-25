import classes from "./ProfileForm.module.css";
import React, { useRef } from "react";
import { useCustomContext } from "../store/auth-context";
import changePassword from "../Auth/requests/changePassword";
const ProfileForm = () => {
  const inputRef = useRef();
  const { token } = useCustomContext(); // grab token from auth-context

  const changePasswordHandler = (e) => {
    e.preventDefault();
    // Change the password using the imported helper ƒ() from requestFunctions.js
    changePassword(token, inputRef.current.value);
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={inputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
