import React from "react";
import styles from "./Input.module.css";

const input = props => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
          {...props.elementConfig}
        />
      );
  }

  return (
    <div className={styles.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
