import React from "react";
import styles from "./Overlay.module.css";

const overlay = (props) => {
  return (
    <div className={styles.Overlay}>
      <div className={styles.Backdrop} onClick={props.clicked}/>
      {props.children}
    </div>
  );
};

export default overlay;
