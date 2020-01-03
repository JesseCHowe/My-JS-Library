import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Books from "./components/Books/Books";
import Toolbar from "./components/Toolbar/Toolbar";
import MiniMap from "./components/MiniMap/MiniMap";
import Overlay from "./components/UI/Overlay/Overlay";
import Spinner from "./components/UI/Spinner/Spinner";
import axios from "./axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myJSBooks: null,
      addBook: false,
      //Local UI State: Move to their respective component
      displayBook: false,
      bookToDisplay: null,
      loading: false,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadLibraryData();
  }

  loadLibraryData = () => {
    axios
      .get("https://myjs-library.firebaseio.com/library.json")
      .then(response => {
        let arr = { ...response.data };
        this.setState({
          myJSBooks: arr
        });
      });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  displayBookHandler = book => {
    this.setState({ displayBook: true, bookToDisplay: book });
  };

  cancelDisplayBookHandler = () => {
    this.setState({ displayBook: false });
  };

  addBookHandler = () => {
    this.setState({
      addBook: true
    });
    //   this.setState({ loading: true });
    //   const order = {
    //     cover: "new cover",
    //     pages: 210,
    //     read: 89,
    //     title: "myBook"
    //   };
    //   axios
    //     .post("/library.json", order)
    //     .then(response => {
    //       this.setState({
    //         loading: false,
    //         addBook: true
    //       });
    //       axios
    //         .get("https://myjs-library.firebaseio.com/library.json")
    //         .then(response => {
    //           this.setState({ myJSBooks: response.data });
    //         })
    //         .catch(error => {
    //           this.setState({ error: true });
    //         });
    //     })
    //     .catch(error => {
    //       this.setState({ loading: false });
    //     });
    // };
  };

  cancelAddBookHandler = () => {
    this.setState({ addBook: false });
  };

  sendBookHandler = () => {
    console.log("Sending Your Book");
  };

  render() {
    let myBooks = <Spinner />;
    if (this.state.addBook || this.state.myJSBooks) {
      myBooks = (
        <Books
          library={this.state.myJSBooks}
          displayBook={this.displayBookHandler}
        />
      );
    }
    return (
      <div className="App">
        <Header />
        <Overlay
          addBook={this.state.addBook}
          showBook={this.state.displayBook}
          currentBook={this.state.bookToDisplay}
          cancel={this.cancelAddBookHandler}
          dontShow={this.cancelDisplayBookHandler}
          sendBook={this.sendBookHandler}
          loadData={this.loadLibraryData}
        />
        <div className="Flex-Container">
          <Toolbar addBook={this.addBookHandler} />
          {myBooks}
          {/* <MiniMap library={this.state.myJSBooks} /> */}
        </div>
      </div>
    );
  }
}

export default App;
