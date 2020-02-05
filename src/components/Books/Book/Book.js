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
      minHeight: "20px",
      maxHeight: "150px",
      minWidth: "400px",
      maxWidth: "550px",
      height: `${this.props.bookObj.book.pages * 0.5}px`,
      width: `${this.props.bookObj.book.pages * 1.05}px`
    };

    const randomStyles = [
      styles.Red,
      styles.Green,
      styles.Blue,
      styles.Yellow,
      styles.Orange
    ];

    let style = {
      minHeight: "20px",
      maxHeight: "150px",
      height: `${this.props.bookObj.book.pages * 0.5}px`,
      width: `${(this.props.bookObj.book.read / this.props.bookObj.book.pages) *
        100}%`,
      position: "absolute",
      left: "0",
      top: "0",
      background: "#ffed77",
      zIndex: "-1"
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
          randomStyles[Math.floor(Math.random() * 5)]
        ].join(" ")}
        onClick={this.bookDisplayHandler}
      >
        {bookInternal}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayBook: bookInfo => dispatch(actions.displayBook(bookInfo))
  };
};

export default connect(null, mapDispatchToProps)(Radium(Book));
