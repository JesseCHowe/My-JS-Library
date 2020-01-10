import * as actionTypes from "../actions/actionTypes";

const initialState = {
  books: null,
  loading: false,
  error: false,
  displayBook: false,
  displayAddBookForm: false,
  bookToDisplay: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.ADD_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        displayAddBookForm: false,
        displayBook: false
      };

    case actionTypes.DELETE_BOOK_SUCCESS:
      return {
        ...state,
        displayBook: false
      };

    case actionTypes.SET_BOOKS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.SET_BOOKS:
      return {
        ...state,
        books: action.books,
        error: false
      };

    case actionTypes.FETCH_BOOKS_FAILED:
      return {
        ...state,
        error: true
      };

    case actionTypes.DISPLAY_BOOK:
      return {
        ...state,
        displayBook: true,
        bookToDisplay: {
          ...state.books[action.payload],
          key: action.payload
        }
      };

    case actionTypes.HIDE_BOOK:
      return {
        ...state,
        displayBook: false,
        bookToDisplay: null
      };

    case actionTypes.DISPLAY_ADD_BOOK:
      return {
        ...state,
        displayAddBookForm: !state.displayAddBookForm
      };

    default:
      return state;
  }
};

export default reducer;
