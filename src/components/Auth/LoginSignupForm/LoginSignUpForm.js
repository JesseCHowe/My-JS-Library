import React from "react";
import { Component } from "react";
import styles from "./LoginSignUpForm.module.css";
import Button from "../../UI/Button/Button";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Input from "../../UI/Input/Input";
import Spinner from "../../UI/Spinner/Spinner";
import Overlay from "../../UI/Overlay/Overlay";

class LoginSignUpForm extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
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
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
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
    this.setState((prevState) => {
      return { openDropDown: !prevState.openDropDown };
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let formInput = formElementsArray.map((formElement) => (
      <Input
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      formInput = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const styled = {
      background: `var(--highlight-${this.props.color})`,
    };
    return (
      <Overlay clicked={() => this.props.toggleDisplayForm()}>
        <div className={styles.Signup}>
          <div className={styles.Design} style={styled}>
            <span>
              Build
              <br />
              Your
              <br />
              Javascript
              <br />
              Collection
            </span>
          </div>
          <div className={styles.FormContainer}>
            <div>
              <form onSubmit={this.submitHandler}>
                {errorMessage}
                {formInput}
                <button className={styles.SignBtn}>
                  {this.state.isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>
              <Button btnType="changeAuth" clicked={this.switchAuthModeHandler}>
                {this.state.isSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </div>
        </div>
      </Overlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    displayForm: state.auth.displayForm,
    userId: state.auth.userId,
    user: state.auth.user,
    color: state.selectColor.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onDisplay: () => dispatch(actions.display()),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUpForm);
