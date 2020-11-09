import React, { Component } from "react";
import styles from "./Auth.module.css";
import Welcome from "./Welcome/Welcome";
import SignUp from "./SignUp/SignUp";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    displayForm: false,
    isSignedUp: false,
  };

  toggleDisplayForm() {
    const newState = {
      ...this.state,
      displayForm: !this.state.displayForm,
    };
    this.setState(newState);
  }
  render() {
    let mode;
    this.props.user
      ? (mode = <Welcome user={this.props.user} />)
      : (mode = (
          <SignUp
            displayForm={this.state.displayForm}
            toggleDisplayForm={() => this.toggleDisplayForm()}
          />
        ));
    return <div className={styles.Auth}>{mode}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    displayForm: state.auth.displayForm,
    userId: state.auth.userId,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Auth);
