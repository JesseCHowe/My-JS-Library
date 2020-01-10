import React, { Component } from "react";
import styles from "./Toolbar.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Toolbar extends Component {
  displayAddBookHandler = () => {
    this.props.onDisplayAddBook();
  };
  render() {
    return (
      <div className={[styles.Toolbar, "visible"].join(" ")}>
        <h3>My Toolbar</h3>
        <button onClick={this.displayAddBookHandler}>Add Book</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayAddBook: () => dispatch(actions.displayAddBook())
  };
};

export default connect(null, mapDispatchToProps)(Toolbar);
