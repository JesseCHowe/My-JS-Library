import React from "react";
import styles from "./Books.module.css";

import Book from "./Book/Book";

const books = props => {
  return (
    <div className={styles.Books}>
      {Object.keys(props.library).map(item => {
        return (
          <Book
            book={props.library[item].title}
            bookObj={props.library[item]}
            clicked={props.displayBook}
            key={item}
          />
        );
      })}
    </div>
  );
};

export default books;
