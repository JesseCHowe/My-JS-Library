import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Button from "../../UI/Button/Button";

class AddBookDisplay extends Component {
  displayAddBookHandler = () => {
    this.props.onDisplayAddBook();
  };

  render() {
    return (
      <Button btnType="Test" clicked={this.displayAddBookHandler}>
        Add Book
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayAddBook: () => dispatch(actions.displayAddBook())
  };
};

export default connect(null, mapDispatchToProps)(AddBookDisplay);
