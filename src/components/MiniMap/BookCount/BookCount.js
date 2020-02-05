import React from "react";
import styles from "./BookCount.module.css";

const bookCount = props => {
  return (
    <div className={[styles.BookCount, "showHead"].join(" ")}>
      <p>
        There are <span>{props.count}</span> books in your collection
      </p>
    </div>
  );
};

export default bookCount;
