import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./BookDisplay.module.css";
import * as actions from "../../store/actions/index";
import Overlay from "../UI/Overlay/Overlay";
import Backdrop from "../UI/Backdrop/Backdrop";
import ViewBook from "../ViewBook/ViewBook";
import EditBook from "../EditBook/EditBook";

class BookDisplay extends Component {
  state = {
    editMode: false,
    disableEditBtn: false,
    disableViewBtn: true
  };

  editModeHandler = () => {
    this.setState({
      editMode: !this.state.editMode,
      disableEditBtn: !this.state.disableEditBtn,
      disableViewBtn: !this.state.disableViewBtn
    });
  };

  hideBookDisplayHandler = () => {
    this.setState({
      editMode: false,
      disableEditBtn: false,
      disableViewBtn: true
    });
    this.props.onHideBook();
  };

  render() {
    let bookDisplay;
    let bookDisplayContent;

    if (this.props.displayBook) {
      bookDisplayContent = this.state.editMode ? <EditBook /> : <ViewBook />;
      bookDisplay = (
        <Overlay>
          <Backdrop clicked={this.hideBookDisplayHandler} />
          <div className={styles.BookDisplay}>
            <div className={styles.Mode}>
              <button
                onClick={this.editModeHandler}
                disabled={this.state.disableViewBtn}
              >
                View
              </button>
              <button
                onClick={this.editModeHandler}
                disabled={this.state.disableEditBtn}
              >
                Edit
              </button>
            </div>
            {bookDisplayContent}
          </div>
        </Overlay>
      );
    }

    return <React.Fragment>{bookDisplay}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    library: state.library.books,
    displayBook: state.library.displayBook,
    bookToDisplay: state.library.bookToDisplay,
    userId: state.auth.userId,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteBook: (userId, bookKey, token) =>
      dispatch(actions.deleteBook(userId, bookKey, token)),
    onHideBook: () => dispatch(actions.hideBook())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDisplay);
