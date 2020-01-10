import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BookDisplay extends Component {
  render() {
    let bookImage;
    let bookDisplay;

    if (this.props.displayBook) {
      if (this.props.bookToDisplay.cover) {
        bookImage = (
          <div>
            <img
              src={this.props.bookToDisplay.cover}
              alt={this.props.bookToDisplay.title}
            />
          </div>
        );
      }
      bookDisplay = (
        <div>
          {bookImage}
          <div>
            <p>Title: {this.props.bookToDisplay.title}</p>
            <p>
              Pages: {this.props.bookToDisplay.read} /{" "}
              {this.props.bookToDisplay.pages}
            </p>
            <p>Author: Author Name Here</p>
          </div>
        </div>
      );
    }
    return <React.Fragment>{bookDisplay}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    library: state.library.books,
    displayBook: state.library.displayBook,
    bookToDisplay: state.library.bookToDisplay,
    userId: state.auth.userId,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteBook: (userId, bookKey, token) =>
      dispatch(actions.deleteBook(userId, bookKey, token)),
    onHideBook: () => dispatch(actions.hideBook())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDisplay);
