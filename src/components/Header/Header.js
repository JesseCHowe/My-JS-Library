import React from "react";
import styles from "./Header.module.css";

const header = () => (
  <header className={[styles.Header, "showHead"].join(" ")}>
    <h1>
      My <span>JS</span> Library
    </h1>
  </header>
);

export default header;
