import React, { Component } from "react";

import styles from "./AddBook.module.css";
import Input from "../UI/Input/Input";
import Spinner from "../UI/Spinner/Spinner";
import axios from "../../axios";

class AddBook extends Component {
  state = {
    bookForm: {
      cover: {
        elementType: "file",
        elementConfig: {
          type: "file",
          placeholder: ""
        },
        value: "",
        valid: true,
        touched: false
      },
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Book Title"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Author"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      read: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Pages Read"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      pages: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Total Pages"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.bookForm) {
      formData[formElementIdentifier] = this.state.bookForm[
        formElementIdentifier
      ].value;
    }
    const newBook = formData;
    axios
      .post("/library.json", newBook)
      .then(response => {
        this.setState({ loading: false });
        this.props.loadData();
        this.props.cancel();
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedBookForm = {
      ...this.state.bookForm
    };
    const updatedBookFormElement = {
      ...updatedBookForm[inputIdentifier]
    };
    updatedBookFormElement.value = event.target.value;
    updatedBookFormElement.valid = this.checkValidity(
      updatedBookFormElement.value,
      updatedBookFormElement.validation
    );
    updatedBookFormElement.touched = true;
    updatedBookForm[inputIdentifier] = updatedBookFormElement;
    console.log(updatedBookFormElement);

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
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <button disabled={!this.state.formIsValid}>Add Book</button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.AddBook}>
        <h4>Enter your book</h4>
        {form}
      </div>
    );
  }
}

export default AddBook;
