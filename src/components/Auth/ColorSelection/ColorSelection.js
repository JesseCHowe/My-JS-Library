import React, { Component } from "react";
import Overlay from "../../UI/Overlay/Overlay";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import styles from "./ColorSelection.module.css";

class ColorSelection extends Component {
  onSetColor(color) {
    this.props.setColor(color);
  }
  render() {
    let selection;
    if (this.props.display) {
      selection = (
        <Overlay clicked={this.props.clicked}>
          <div className={styles.ColorSelectContainer}>
            <h1>Select Theme</h1>
            <div className={styles.ColorList}>
              <ul>
                <li>
                  <button onClick={() => this.onSetColor("red")}>
                    <span className={styles.RedCircle} />
                  </button>
                </li>
                <li>
                  <button onClick={() => this.onSetColor("blue")}>
                    <span className={styles.BlueCircle} />
                  </button>
                </li>
                <li>
                  <button onClick={() => this.onSetColor("green")}>
                    <span className={styles.GreenCircle} />
                  </button>
                </li>
                <li>
                  <button onClick={() => this.onSetColor("purple")}>
                    <span className={styles.PurpleCircle} />
                  </button>
                </li>
                <li>
                  <button onClick={() => this.onSetColor("dark")}>
                    <span className={styles.DarkCircle} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Overlay>
      );
    }
    return <React.Fragment>{selection}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    color: state.selectColor.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setColor: (color) => dispatch(actions.setColor(color)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorSelection);
