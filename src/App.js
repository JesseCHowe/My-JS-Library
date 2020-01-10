import React, { Component } from "react";
import "./App.css";
import AddBook from "./components/AddBook/AddBook";
import Auth from "./components/Auth/Auth";
import BookDisplay from "./components/BookDisplay/BookDisplay";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
// import MiniMap from "./components/MiniMap/MiniMap";
import Toolbar from "./components/Toolbar/Toolbar";
import Spinner from "./components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    console.log("[APP] Did Mount");
    this.props.onTryAutoSignIn();
  }

  componentDidUpdate() {
    if (!this.props.library || !this.props.userId) {
      console.log("[APP] Did Update");
      this.props.onInitLibrary(this.props.userId);
    }
  }

  render() {
    console.log("[APP] Did Render");
    let myBooks = (
      <div>
        <p>Please Login to see your list of Javascript Books</p>
      </div>
    );
    if (this.props.loading) {
      myBooks = <Spinner />;
    }
    if (this.props.library) {
      myBooks = <Books library={this.props.library} />;
    }
    return (
      <div className="App">
        <Auth />
        <Header />
        <div className="Flex-Container">
          <Toolbar />
          <AddBook />
          <BookDisplay />
          {myBooks}
          {/* <MiniMap library={this.state.myJSBooks} /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    library: state.library.books,
    error: state.library.error,
    loading: state.library.loading,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLibrary: user => dispatch(actions.initLibrary(user)),
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
