import React, { Component } from "react";
import styles from "./Header.module.css";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    let styledA = {
      color: `var(--highlight-${this.props.color})`,
    };
    let styledBlock = {
      background: `var(--highlight-${this.props.color})`,
    };
    return (
  <header className={[styles.Header, "showHead"].join(" ")}>
    <h1>
      My <span className={styles.Block} style={styledBlock}><span className={styles.Js}>JS</span></span><br/>Library
    </h1>
    <p>
      This is a project I built to practice React and state management. It is a
      simple library app with a few additional features. The layout is inspired
      by The Pudding's Hipster Summer Reading List
    </p>
    <p>
      This project includes the use of Firebase as a backend for storing user
      accounts and books, along with Redux for state management. Feel free to
      create an account and upload your own books. In the future I plan to
      incorporate a book API for adding books rather than this slow and old
      fashioned input field. So look forward to that in the future. I hope you
      enjoy this small project I have built and to see other projects you can
      visit my <a style={styledA} href="https://github.com/JesseCHowe">Github site</a>.
    </p>
  </header>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    color: state.selectColor.color,
  };
};

export default connect(mapStateToProps, null)(Header);
