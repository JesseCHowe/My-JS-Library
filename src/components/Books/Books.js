import React, { Component } from "react";
import styles from "./Books.module.css";

import Book from "./Book/Book";

class Books extends Component {
  render() {
    let sortMethod;

    if (this.props.method === "Alphabetical") {
      sortMethod = (a, b) => {
        const bookA = this.props.library[a].title;
        const bookB = this.props.library[b].title;
        let comparison = 0;
        if (bookA > bookB) {
          comparison = 1;
        } else if (bookA < bookB) {
          comparison = -1;
        }
        return comparison;
      };
    }

    if (this.props.method === "length") {
      sortMethod = (a, b) => {
        const bookA = +this.props.library[a].pages;
        const bookB = +this.props.library[b].pages;
        let comparison = 0;
        if (bookA > bookB) {
          comparison = 1;
        } else if (bookA < bookB) {
          comparison = -1;
        }
        return comparison;
      };
    }

    if (this.props.method === "completion") {
      sortMethod = (a, b) => {
        const bookA = this.props.library[a].read / this.props.library[a].pages;
        const bookB = this.props.library[b].read / this.props.library[b].pages;
        let comparison = 0;
        if (bookA < bookB) {
          comparison = 1;
        } else if (bookA > bookB) {
          comparison = -1;
        }
        return comparison;
      };
    }

    let letter;

    let typeMethod = book => book;
    let nameMethod = book => {
      const bookTitle = this.props.library[book].title.toLowerCase().trim();
      const inputField = this.props.searchField.toLowerCase().trim();
      return bookTitle.includes(inputField);
    };

    return (
      <div className={[styles.Books, "myTest"].join(" ")}>
        {Object.keys(this.props.library)
          .sort(sortMethod)
          .filter(typeMethod)
          .filter(nameMethod)
          .map((item, idx) => {
            const newidx = Object.keys(this.props.library).indexOf(item);
            const letterArr = this.props.library[item].title
              .toLowerCase()
              .split("");

            let letterReturn;

            if (this.props.method === "Alphabetical") {
              if (letter !== letterArr[0]) {
                letterReturn = (
                  <span key={letterArr[0]} className={styles.Letters}>
                    <p>{letterArr[0]}</p>
                  </span>
                );
                letter = letterArr[0];
              } else {
                letterReturn = null;
              }
            }

            return (
              <React.Fragment key={`Framgement${idx}`}>
                {letterReturn}
                <Book
                  book={this.props.library[item].title}
                  bookObj={{
                    key: Object.keys(this.props.library)[newidx],
                    book: this.props.library[item]
                  }}
                  clicked={this.props.displayBook}
                  key={Object.keys(this.props.library)[newidx]}
                />
              </React.Fragment>
            );
          })}
      </div>
    );
  }
}

export default Books;
