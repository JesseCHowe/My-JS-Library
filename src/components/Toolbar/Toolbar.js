import React from "react";
import styles from "./Toolbar.module.css";

const toolbar = props => (
  <div className={[styles.Toolbar, "visible"].join(" ")}>
    <h3>My Toolbar</h3>
    <button onClick={props.addBook}>Add Book</button>
    <p>Sort By:</p>
    <ul>
      <li>Alphabetical</li>
      <li>Author</li>
      <li>Completed</li>
    </ul>
  </div>
);

export default toolbar;
