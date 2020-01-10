import React from "react";
import styles from "./Books.module.css";

import Book from "./Book/Book";

const books = props => {
  return (
    <div className={styles.Books}>
      {Object.keys(props.library).map((item, idx) => {
        return (
          <Book
            book={props.library[item].title}
            bookObj={{
              key: Object.keys(props.library)[idx],
              book: props.library[item]
            }}
            clicked={props.displayBook}
            key={Object.keys(props.library)[idx]}
          />
        );
      })}
    </div>
  );
};

export default books;
