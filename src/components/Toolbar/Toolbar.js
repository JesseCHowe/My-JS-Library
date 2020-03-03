import React, { Component } from "react";
import styles from "./Toolbar.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import SortCategories from "./SortCategories/SortCategories";
import SearchBar from "./SeachBar/SearchBar";
import AddBookDisplay from "./AddBookDisplay/AddBookDisplay";

class Toolbar extends Component {
  state = {
    expand: false
  };
  onExpandHandler = () => {
    const myIntsct = document.querySelector("#myIntersect");

    if (this.state.expand) {
      myIntsct.style.transform = "translateX(-100%)";
      this.setState({
        expand: false
      });
    } else {
      myIntsct.style.transform = "translateX(0)";
      this.setState({
        expand: true
      });
    }
  };
  render() {
    let displayAddBook;
    if (this.props.userId) {
      displayAddBook = <AddBookDisplay />;
    }
    return (
      <div className={[styles.Toolbar, "visible"].join(" ")}>
        <div id="myIntersect" className={styles.SlideInBar}>
          <button
            className={styles.Expand}
            onClick={() => this.onExpandHandler()}
          >
            EXPAND
          </button>
          {displayAddBook}
          <SearchBar />
          <SortCategories />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, null)(Toolbar);
