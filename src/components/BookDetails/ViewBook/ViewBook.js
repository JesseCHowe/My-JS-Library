import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import styles from "./ViewBook.module.css";
import BookProgress from "./BookProgress/BookProgress";

class BookDisplay extends Component {
  render() {
    let bookDisplay;
    const pct = this.props.bookToDisplay.read / this.props.bookToDisplay.pages;
    if (this.props.displayBook) {
      bookDisplay = (
        <div className={styles.ViewBook}>
          <div className={styles.ContentContainer}>
            <div>
              <BookProgress pct={pct} color={this.props.color} />
            </div>
            <div className={styles.AboutBook}>
              <div>
                <p className={styles.Title}>{this.props.bookToDisplay.title}</p>
                <p className={styles.Author}>
                  <span>by</span> {this.props.bookToDisplay.author}
                </p>
                <br />
                <p>
                  <span>Read </span>
                  {this.props.bookToDisplay.read} <span>of</span>{" "}
                  {this.props.bookToDisplay.pages} <span>pages </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <React.Fragment>{bookDisplay}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    library: state.library.books,
    displayBook: state.library.displayBook,
    bookToDisplay: state.library.bookToDisplay,
    userId: state.auth.userId,
    token: state.auth.token,
    color: state.selectColor.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteBook: (userId, bookKey, token) =>
      dispatch(actions.deleteBook(userId, bookKey, token)),
    onHideBook: () => dispatch(actions.hideBook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDisplay);
