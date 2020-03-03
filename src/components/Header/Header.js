import React from "react";
import styles from "./Header.module.css";

const header = () => (
  <header className={[styles.Header, "showHead"].join(" ")}>
    <h1>
      My <span>JS</span> Library
    </h1>
    <p>
      This is a project I built to practice React and state management. It is a
      simple library app with a few additional features. The layout is inspired
      by The Pudding's <a href="#">Hipster Summer Reading List</a>
    </p>
    <p>
      This project includes the use of Firebase as a backend for storing user
      accounts and books, along with Redux for state management. Feel free to
      create an account and upload your own books. In the future I plan to
      incorporate a book API for adding books rather than this slow and old
      fashioned input field. So look forward to that in the future. I hope you
      enjoy this small project I have built and to see other projects you can
      visit my <a href="#">Github site</a>.
    </p>
  </header>
);

export default header;
