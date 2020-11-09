import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Overlay from "../../UI/Overlay/Overlay";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./AddBookModal.module.css";

class AddBookModal extends Component {
  state = {
    bookForm: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
      read: {
        elementType: "text",
        elementConfig: {
          type: "number",
        },
        value: 0,
        validation: {
          required: true,
          isNumber: true,
        },
        valid: false,
        touched: false,
      },
      pages: {
        elementType: "text",
        elementConfig: {
          type: "number",
        },
        value: 1,
        validation: {
          required: true,
          isNumber: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
  };

  initialState = this.state;

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.bookForm) {
      formData[formElementIdentifier] = this.state.bookForm[
        formElementIdentifier
      ].value;
    }
    const newBook = formData;
    this.props.onAddBook(newBook, this.props.userId, this.props.token);
    this.setState({ ...this.initialState });
  };

  checkValidityHandler(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isNumber) {
      const numbers = /^[0-9]+$/;
      isValid = value.match(numbers) && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedBookForm = {
      ...this.state.bookForm,
    };
    const updatedBookFormElement = {
      ...updatedBookForm[inputIdentifier],
    };
    updatedBookFormElement.value = event.target.value;
    updatedBookFormElement.valid = this.checkValidityHandler(
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

  hideBookHandler = () => {
    this.props.onDisplayAddBook();
    this.setState({ ...this.initialState });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.bookForm) {
      formElementsArray.push({
        id: key,
        config: this.state.bookForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <fieldset key={formElement.id}>
            <Input
              inputType={`EditBook ${formElement.id}`}
              label={formElement.id}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              value={formElement.config.value}
            />
          </fieldset>
        ))}
        <Button btnType="Update" disabled={!this.state.formIsValid}>
          Add Book
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    let formDisplay;

    if (this.props.display) {
      formDisplay = (
        <Overlay clicked={this.props.clicked}>
          <div className={styles.AddBookModal}>
            <h4>Enter your book</h4>
            {form}
          </div>
        </Overlay>
      );
    }

    return <React.Fragment>{formDisplay}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    displayAddBookForm: state.library.displayAddBookForm,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBook: (bookInfo, bookId, token) =>
      dispatch(actions.addBook(bookInfo, bookId, token)),
    onDisplayAddBook: () => dispatch(actions.displayAddBook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
