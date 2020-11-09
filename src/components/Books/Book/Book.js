import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import styles from "./Book.module.css";
import Radium from "radium";

class Book extends Component {
  bookDisplayHandler = () => {
    this.props.onDisplayBook(this.props.bookObj.key);
  };

  render() {
    let bookStyle = {
      height: `${this.props.bookObj.book.pages * 0.5}px`,
    };

    let style = {
      height: `${this.props.bookObj.book.pages * 0.5}px`,
      width: `${
        (this.props.bookObj.book.read / this.props.bookObj.book.pages) * 100
      }%`,
      position: "absolute",
      left: "0",
      top: "0",
      background: `var(--highlight-${this.props.color})`,
      zIndex: "-1",
    };

    let bookInternal = (
      <div className={styles.Book} key={this.props.bookObj.key}>
        <p>{this.props.book}</p>
        <span style={style}></span>
      </div>
    );

    return (
      <div
        style={bookStyle}
        className={[
          styles.BookContain,
        ].join(" ")}
        onClick={this.bookDisplayHandler}
      >
        {bookInternal}
      </div>
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
    onDisplayBook: (bookInfo) => dispatch(actions.displayBook(bookInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Book));
