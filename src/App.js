import React, { Component } from "react";
import Auth from "./components/Auth/Auth";
import BookDetails from "./components/BookDetails/BookDetails";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
import Toolbar from "./components/Toolbar/Toolbar";
import Spinner from "./components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import AddBook from "./components/AddBook/AddBook";
import "./App.css";

class App extends Component {
  state = {
    displayAddBook: false,
  };

  addBookDisplayHandler(displayPreference) {
    displayPreference !== null
      ? this.setState({ displayAddBook: displayPreference })
      : this.setState({ displayAddBook: !this.state.displayAddBook });
  }

  componentDidMount() {
    const defaultAccount = process.env.REACT_APP_FIREBASE_ENDPOINT;
    this.props.onInitLibrary(defaultAccount);
    this.props.onTryAutoSignIn();
    const observer = new IntersectionObserver(
      (entry) => {
        const myIntsct = document.querySelector("#myIntersect");
        if (window.innerWidth > 700) {
          entry[0].isIntersecting
            ? (myIntsct.style.transform = "translateX(0)")
            : (myIntsct.style.transform = "translateX(-103%)");
        }
      },
      { rootMargin: "0px 0px 40px 0px" }
    );
    observer.observe(document.querySelector("#intersectionTest"));
  }

  componentDidUpdate() {
    if (!this.props.library || !this.props.userId) {
      this.props.onInitLibrary(this.props.userId);
    }
  }

  render() {
    let styled = {
      backgroundColor: `var(--primary-${this.props.color})`,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23efefef' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
    };
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
      <div className="App" style={styled}>
        <Auth />
        <Header />
        <BookDetails />
        <AddBook />
        <div id="intersectionTest" className="Flex-Container">
          <Toolbar />
          {myBooks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    library: state.library.books,
    error: state.library.error,
    loading: state.library.loading,
    userId: state.auth.userId,
    sortMethod: state.filters.sortMethod,
    searchField: state.filters.search,
    color: state.selectColor.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitLibrary: (user) => dispatch(actions.initLibrary(user)),
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
