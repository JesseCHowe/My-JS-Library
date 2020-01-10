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

    let style = {
      minHeight: "20px",
      maxHeight: "150px",
      height: `${this.props.bookObj.book.pages * 0.5}px`,
      width: `${(this.props.bookObj.book.read / this.props.bookObj.book.pages) *
        100}%`,
      position: "absolute",
      left: "0",
      background: "lightblue"
    };

    if (this.props.bookObj.book.read / this.props.bookObj.book.pages === 0.5) {
      style = {
        ...style,
        background: "lightgreen"
      };
    }

    // if (this.props.bookObj.book.pages > 300) {
    //   bookStyle = {
    //     ...bookStyle,
    //     left: "10px"
    //   };
    // } else {
    //   bookStyle = {
    //     ...bookStyle,
    //     right: `${this.props.bookObj.book.pages}px`
    //   };
    // }

    return (
      <div
        style={bookStyle}
        className={styles.BookContain}
        onClick={this.bookDisplayHandler}
      >
        <div style={bookStyle} className={styles.GradientOverlay}></div>
        <div className={styles.Book} key={this.props.bookObj.key}>
          <p>{this.props.book}</p>
        </div>
        <div style={style}></div>
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
