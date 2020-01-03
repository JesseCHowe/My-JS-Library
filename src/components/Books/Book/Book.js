import React from "react";
import styles from "./Book.module.css";

const book = props => (
  <div className={styles.Book} onClick={() => props.clicked(props.bookObj)}>
    {props.book}
  </div>
);

export default book;
