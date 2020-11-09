import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Button from "../../UI/Button/Button";

class AddBookButton extends Component {
  displayAddBookHandler = () => {
    this.props.onDisplayAddBook();
  };

  render() {
    let displayAddBook;
    if (this.props.userId) {
      displayAddBook = (
        <Button btnType="AddBook" clicked={this.props.clicked}>
          +
        </Button>
      );
    }
    return <React.Fragment>{displayAddBook}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDisplayAddBook: () => dispatch(actions.displayAddBook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookButton);
