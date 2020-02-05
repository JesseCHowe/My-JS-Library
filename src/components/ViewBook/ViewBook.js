import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import styles from "./ViewBook.module.css";

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
        <div className={styles.ViewBook}>
          {bookImage}
          <div>
            <div>
              <p>
                You've read{" "}
                {Math.round(
                  (this.props.bookToDisplay.read /
                    this.props.bookToDisplay.pages) *
                    100
                )}
                %
              </p>
              <p>
                <span>Title: </span> {this.props.bookToDisplay.title}
              </p>
              <p>
                <span>Read: </span>
                {this.props.bookToDisplay.read} /{" "}
                {this.props.bookToDisplay.pages}
              </p>
              <p>
                <span>Author: </span> Author Name Here
              </p>
            </div>
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
