import React, { Component } from "react";
import styles from "./Toolbar.module.css";
import { connect } from "react-redux";
import SortCategories from "./SortCategories/SortCategories";
import SearchBar from "./SeachBar/SearchBar";

class Toolbar extends Component {
  state = {
    expand: false,
  };

  closeExpandHandler = () => {
    const myIntsct = document.querySelector("#myIntersectmobile");
    myIntsct.style.transform = "translateX(-103%)";
    this.setState({
      expand: false,
    });
  };
  onExpandHandler = () => {
    const myIntsct = document.querySelector("#myIntersectmobile");
    if (this.state.expand) {
      myIntsct.style.transform = "translateX(-103%)";
      this.setState({
        expand: false,
      });
    } else {
      myIntsct.style.transform = "translateX(0)";
      this.setState({
        expand: true,
      });
    }
  };

  render() {
    const toolBarDesktop = (
      <div className={[styles.Toolbar, "visible"].join(" ")}>
        <div id="myIntersect" className={styles.SlideInBar}>
          <SearchBar />
          <SortCategories />
        </div>
      </div>
    );

    let overlay;
    if (this.state.expand) {
      overlay = (
        <div
          className={styles.SpecialOverlay}
          onClick={() => this.closeExpandHandler()}
        />
      );
    }
    const toolBarMobile = (
      <React.Fragment>
        <button
          className={styles.Expand}
          onClick={() => this.onExpandHandler()}
        >
          <div className={styles.expndBtn}>
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
          </div>
        </button>
        {overlay}
        <div
          id="myIntersectmobile"
          className={[styles.ToolbarMobile, "visible"].join(" ")}
        >
          <div className={styles.SlideInBar}>
            <SearchBar />
            <SortCategories />
          </div>
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {toolBarDesktop}
        {toolBarMobile}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(Toolbar);
