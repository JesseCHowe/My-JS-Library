import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import styles from "./Welcome.module.css";
import ColorSelection from "../ColorSelection/ColorSelection";

class Welcome extends Component {
  state = {
    dropDownOpen: false,
    colorSelectionOpen: false,
  };

  colorSelectionOpenHandler(mode) {
    const state = {
      ...this.state,
      colorSelectionOpen: mode,
    };
    this.setState(state);
  }

  dropDownHandler() {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  }

  logoutFormHandler = () => {
    this.props.onLogout();
  };

  render() {
    const styledBlock = {
      background: `var(--primary-${this.props.color})`,
    };
    let dropDown;
    if (this.state.dropDownOpen) {
      dropDown = (
        <React.Fragment>
          <div>
            <button onClick={() => this.colorSelectionOpenHandler(true)}>
              Select Theme
              <span className={styles.ColorCircle} style={styledBlock}></span>
            </button>
            <button onClick={() => this.logoutFormHandler()}>Logout</button>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className={styles.WelcomeContainer}>
          <button onClick={() => this.dropDownHandler()}>
            Welcome, {this.props.user}
          </button>
          {dropDown}
        </div>
        <ColorSelection
          clicked={() => this.colorSelectionOpenHandler(false)}
          display={this.state.colorSelectionOpen}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    color: state.selectColor.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
