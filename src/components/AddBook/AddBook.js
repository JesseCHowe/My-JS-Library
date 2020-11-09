import React, { Component } from "react";
import AddBookButton from "./AddBookButton/AddBookButton";
import AddBookModal from "./AddBookModal/AddBookModal";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class AddBook extends Component {
  displayModalHandler(mode) {
    mode !== null
      ? this.setState({ displayModal: mode })
      : this.setState({ displayModal: !this.state.displayAddBook });
  }

  render() {
    return (
      <React.Fragment>
        <AddBookButton clicked={() => this.props.displayAddBook(true)} />
        <AddBookModal
          display={this.props.displayAddBookForm}
          clicked={() => this.props.displayAddBook(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayAddBookForm: state.library.displayAddBookForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayAddBook: (mode) => {
      dispatch(actions.displayAddBook(mode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
