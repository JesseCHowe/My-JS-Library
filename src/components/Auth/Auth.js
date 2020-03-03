import React, { Component } from "react";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Backdrop from "../UI/Backdrop/Backdrop";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Overlay from "../UI/Overlay/Overlay";
import Spinner from "../UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Here"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false,
    displayForm: false,
    openDropDown: false
  };

  checkValidityHandler(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidityHandler(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  loginFormHandler = () => {
    this.props.onDisplay();
  };

  logoutFormHandler = () => {
    this.props.onLogout();
  };

  toggleDropHandler = () => {
    this.setState(prevState => {
      return { openDropDown: !prevState.openDropDown };
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let formInput = formElementsArray.map(formElement => (
      <Input
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      formInput = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let form = "";

    if (this.props.displayForm) {
      form = (
        <Overlay>
          <Backdrop clicked={this.loginFormHandler} />
          <div className={styles.SIGNUP}>
            <div className={styles.Design}>
              <span>
                BUILD
                <br />
                YOUR
                <br />
                JAVASCRIPT
                <br />
                COLLECTION
              </span>
            </div>
            <div className={styles.FormContainer}>
              <div>
                <form onSubmit={this.submitHandler}>
                  {errorMessage}
                  {formInput}
                  <Button btnType="Test">
                    {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
                  </Button>
                </form>
                <Button
                  btnType="changeAuth"
                  clicked={this.switchAuthModeHandler}
                >
                  SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
                </Button>
              </div>
            </div>
          </div>
        </Overlay>
      );
    }

    let authDisplay = (
      <Button btnType="SignIn" clicked={this.loginFormHandler}>
        SIGN IN / SIGN UP
      </Button>
    );
    let logOut;
    if (this.state.openDropDown) {
      logOut = (
        <Button btnType="Logout" clicked={this.logoutFormHandler}>
          Logout
        </Button>
      );
    }
    if (this.props.user) {
      authDisplay = (
        <div className={styles.Auth}>
          <div className={styles.Dropdown}>
            <Button btnType="Welcome" clicked={this.toggleDropHandler}>
              <span>Welcome, </span>
              {this.props.user}
              <span className={styles.DropDownBtn}>
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                </svg>
              </span>
            </Button>
            <div className={styles.DropdownContent}>{logOut}</div>
          </div>
        </div>
      );
    }

    return (
      <div id="hideAuth" className="authTest">
        {authDisplay}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    displayForm: state.auth.displayForm,
    userId: state.auth.userId,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onDisplay: () => dispatch(actions.display()),
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
