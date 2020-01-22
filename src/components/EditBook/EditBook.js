import React, { Component } from "react";
import Input from "../UI/Input/Input";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import styles from "./EditBook.module.css";

class EditBook extends Component {
  state = {
    bookForm: {
      cover: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Book Image"
        },
        validation: {
          required: false
        },
        value: this.props.bookToDisplay.cover,
        valid: true,
        touched: false
      },
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Book Title"
        },
        value: this.props.bookToDisplay.title,
        validation: {
          required: false
        },
        valid: true,
        touched: false
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Author"
        },
        value: this.props.bookToDisplay.author,
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
      read: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Pages Read"
        },
        value: this.props.bookToDisplay.read,
        validation: {
          required: true,
          isNumber: true
        },
        valid: true,
        touched: false
      },
      pages: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Total Pages"
        },
        value: this.props.bookToDisplay.pages,
        validation: {
          required: true,
          isNumber: true
        },
        valid: true,
        touched: false
      }
    },
    formIsValid: true,
    updating: false
  };

  updateBookHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.bookForm) {
      formData[formElementIdentifier] = this.state.bookForm[
        formElementIdentifier
      ].value;
    }
    const updatedBook = formData;
    this.props.onEditBook(
      this.props.bookToDisplay.key,
      updatedBook,
      this.props.userId,
      this.props.token
    );
  };

  deleteBookHandler = () => {
    this.props.onDeleteBook(
      this.props.userId,
      this.props.bookToDisplay.key,
      this.props.token
    );
  };

  checkValidity(value, validation) {
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.isNumber) {
      const numbers = /^[0-9]+$/;
      isValid = value.match(numbers) && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedBookForm = { ...this.state.bookForm };
    const updatedBookFormElement = { ...updatedBookForm[inputIdentifier] };
    updatedBookFormElement.value = event.target.value;
    updatedBookFormElement.valid = this.checkValidity(
      updatedBookFormElement.value,
      updatedBookFormElement.validation
    );
    updatedBookFormElement.touched = true;
    updatedBookForm[inputIdentifier] = updatedBookFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedBookForm) {
      formIsValid = updatedBookForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ bookForm: updatedBookForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.bookForm) {
      formElementsArray.push({
        id: key,
        config: this.state.bookForm[key]
      });
    }
    let form = (
      <form onSubmit={this.updateBookHandler}>
        {formElementsArray.map(formElement => (
          <fieldset>
            <label>{formElement.id}</label>
            <Input
              changed={event => this.inputChangedHandler(event, formElement.id)}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              invalid={!formElement.config.valid}
              key={formElement.id}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              value={formElement.config.value}
            />
          </fieldset>
        ))}
        <button className={styles.Update} disabled={!this.state.formIsValid}>
          UPDATE
        </button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    let formDisplay;
    if (this.props.displayBook) {
      formDisplay = (
        <div className={styles.EditForm}>
          {form}
          <button className={styles.Delete} onClick={this.deleteBookHandler}>
            DELETE
          </button>
        </div>
      );
    }

    return <React.Fragment>{formDisplay}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    displayAddBookForm: state.library.displayAddBookForm,
    displayBook: state.library.displayBook,
    library: state.library.books,
    token: state.auth.token,
    userId: state.auth.userId,
    bookToDisplay: state.library.bookToDisplay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddBook: (bookInfo, bookId, token) =>
      dispatch(actions.addBook(bookInfo, bookId, token)),
    onDisplayAddBook: () => dispatch(actions.displayAddBook()),
    onEditBook: (selectedBookId, newBookInfo, userId, token) =>
      dispatch(actions.editBook(selectedBookId, newBookInfo, userId, token)),
    onDeleteBook: (userId, bookKey, token) =>
      dispatch(actions.deleteBook(userId, bookKey, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
