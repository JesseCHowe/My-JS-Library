import React from "react";
import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={styles[props.label]}
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
    case "number":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          type="number"
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
    <React.Fragment>
      <label>{props.label}</label>
      {inputElement}
    </React.Fragment>
  );
};

export default input;
