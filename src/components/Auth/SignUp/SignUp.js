import React from "react";
import LoginSignUpForm from "../LoginSignupForm/LoginSignUpForm";
import styles from "./SignUp.module.css";

const SignUp = ({ displayForm, toggleDisplayForm }) => {
  let form;
  if (displayForm) {
    form = (
      <LoginSignUpForm
        toggleDisplayForm={() => toggleDisplayForm()}
      ></LoginSignUpForm>
    );
  }
  return (
    <div className={styles.SignUp}>
      <button onClick={() => toggleDisplayForm()}>Log In / Sign Up</button>
      {form}
    </div>
  );
};

export default SignUp;
