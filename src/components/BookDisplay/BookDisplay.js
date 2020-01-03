import React from "react";
import styles from "./BookDisplay.module.css";

const bookDisplay = props => (
  <div className={styles.BookDisplay}>
    <div>
      <img src={props.currentBook.cover} alt={props.currentBook.title} />
    </div>
    <div>
      <p>Title: {props.currentBook.title}</p>
      <p>
        Pages: {props.currentBook.read} / {props.currentBook.pages}
      </p>
      <p>Author: Author Name Here</p>
      <div className={styles.myTags}>
        <span>JS</span>
        <span>Develpoment</span>
        <span>UI</span>
        <span>React</span>
        <span>Sass</span>
        <span>IIFE</span>
      </div>
    </div>
  </div>
);

export default bookDisplay;
