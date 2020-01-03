import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import BookDisplay from "../../BookDisplay/BookDisplay";
import AddBook from "../../AddBook/AddBook";
import styles from "./Overlay.module.css";

const overlay = props => {
  switch (true) {
    case props.addBook:
      return (
        <div className={styles.Overlay}>
          <Backdrop clicked={props.cancel} />
          <AddBook loadData={props.loadData} cancel={props.cancel} />
        </div>
      );
    case props.showBook:
      return (
        <div className={styles.Overlay}>
          <Backdrop clicked={props.dontShow} />
          <BookDisplay
            clicked={props.sendBook}
            currentBook={props.currentBook}
          />
        </div>
      );
    default:
      return null;
  }
};

export default overlay;
