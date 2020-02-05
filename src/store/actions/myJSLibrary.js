import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const setLibraryStart = () => {
  return {
    type: actionTypes.SET_BOOKS_START
  };
};

export const setLibrary = books => {
  return {
    type: actionTypes.SET_BOOKS,
    books: books,
    loading: false
  };
};

export const fetchBooksFailed = error => {
  return {
    type: actionTypes.FETCH_BOOKS_FAILED,
    error: error,
    loading: false
  };
};

export const addBookStart = () => {
  return {
    type: actionTypes.ADD_BOOK_START
  };
};

export const addBookSuccess = () => {
  return {
    type: actionTypes.ADD_BOOK_SUCCESS
  };
};

export const addBookFail = error => {
  return {
    type: actionTypes.ADD_BOOK_FAIL,
    error: error
  };
};

export const editBook = (selectedBookId, newBookInfo, userId, token) => {
  return dispatch => {
    dispatch(addBookStart());
    axios
      .put(
        `/library/${userId}/${selectedBookId}.json?auth=${token}`,
        newBookInfo
      )
      .then(response => {
        dispatch(initLibrary());
        dispatch(addBookSuccess());
      })
      .catch(error => {
        dispatch(addBookFail(error));
      });
  };
};

export const initLibrary = user => {
  return dispatch => {
    if (user) {
      axios
        .get(`https://myjs-library.firebaseio.com/library/${user}.json`)
        .then(response => {
          let arr = { ...response.data };
          dispatch(setLibrary(arr));
        })
        .catch(error => {
          dispatch(fetchBooksFailed(error));
        });
    } else {
      console.log("INIT LIB");
    }
  };
};

export const addBook = (bookInfo, userId, token) => {
  return dispatch => {
    dispatch(addBookStart());
    axios
      .post(`/library/${userId}.json?auth=${token}`, bookInfo)
      .then(response => {
        dispatch(initLibrary());
        dispatch(addBookSuccess());
      })
      .catch(error => {
        dispatch(addBookFail(error));
      });
  };
};

export const deleteBook = (userId, bookKey, token) => {
  return dispatch => {
    axios
      .delete(
        `https://myjs-library.firebaseio.com/library/${userId}/${bookKey}.json?auth=${token}`
      )
      .then(response => {
        dispatch(initLibrary());
        dispatch(deleteBookSuccess());
      });
  };
};

export const deleteBookSuccess = () => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS
  };
};

export const displayBook = bookInfo => {
  return {
    type: actionTypes.DISPLAY_BOOK,
    payload: bookInfo
  };
};

export const hideBook = () => {
  return {
    type: actionTypes.HIDE_BOOK
  };
};

export const displayAddBook = () => {
  return {
    type: actionTypes.DISPLAY_ADD_BOOK
  };
};
