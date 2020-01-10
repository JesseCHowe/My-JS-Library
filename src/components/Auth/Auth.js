import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Backdrop from "../UI/Backdrop/Backdrop";
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
    isSignUp: true,
    displayForm: false
  };

  checkValidity(value, rules) {
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
        valid: this.checkValidity(
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
          <div>
            <form onSubmit={this.submitHandler}>
              {errorMessage}
              {formInput}
              <button>Sign Up</button>
            </form>
            <button onClick={this.switchAuthModeHandler}>
              SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
            </button>
          </div>
        </Overlay>
      );
    }

    let authDisplay = (
      <button onClick={this.loginFormHandler}>SIGN IN / SIGN UP</button>
    );
    if (this.props.user) {
      authDisplay = (
        <React.Fragment>
          <h3>Welcome {this.props.user}</h3>
          <button onClick={this.logoutFormHandler}>Logout</button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {authDisplay}
        {form}
      </React.Fragment>
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
