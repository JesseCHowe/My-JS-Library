import React, { Component } from "react";
import "./App.css";
import AddBook from "./components/AddBook/AddBook";
import Auth from "./components/Auth/Auth";
import BookDisplay from "./components/BookDisplay/BookDisplay";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
import MiniMap from "./components/MiniMap/MiniMap";
import Toolbar from "./components/Toolbar/Toolbar";
import Spinner from "./components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onInitLibrary("pBg7AOuCGjRwzVWIYdJAvqjP5nv1");
    this.props.onTryAutoSignIn();

    const observer = new IntersectionObserver(
      entry => {
        const myIntsct = document.querySelector("#myIntersect");
        const theMiniMap = document.querySelector("#theMiniMap");
        if (entry[0].isIntersecting && window.innerWidth > 1100) {
          myIntsct.style.transform = "translateX(0)";
          theMiniMap.style.transform = "translateX(0)";
        } else {
          myIntsct.style.transform = "translateX(-100%)";
          theMiniMap.style.transform = "translateX(100%)";
        }
      },
      { rootMargin: "0px 0px -50% 0px" }
    );

    observer.observe(document.querySelector("#intersectionTest"));
  }

  componentDidUpdate() {
    if (!this.props.library || !this.props.userId) {
      this.props.onInitLibrary(this.props.userId);
    }
  }

  render() {
    let myBooks = (
      <div>
        <p>Please Login to see your list of Javascript Books</p>
      </div>
    );
    if (this.props.loading) {
      myBooks = <Spinner />;
    }
    if (this.props.library) {
      myBooks = (
        <Books
          library={this.props.library}
          method={this.props.sortMethod}
          searchField={this.props.searchField}
        />
      );
    }
    return (
      <div className="App">
        <AddBook />
        <Auth />
        <Header />
        <div id="intersectionTest" className="Flex-Container">
          <Toolbar />
          {myBooks}
          <BookDisplay />
        </div>
        <MiniMap library={this.props.library} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    library: state.library.books,
    error: state.library.error,
    loading: state.library.loading,
    userId: state.auth.userId,
    sortMethod: state.filters.sortMethod,
    searchField: state.filters.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLibrary: user => dispatch(actions.initLibrary(user)),
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
