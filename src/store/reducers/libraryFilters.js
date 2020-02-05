import * as actionTypes from "../actions/actionTypes";

const initialState = {
  sortMethod: "Alphabetical",
  bookType: "",
  search: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHOOSE_SORT_METHOD:
      return {
        ...state,
        sortMethod: action.method
      };
    case actionTypes.CHOOSE_BOOK_TYPE:
      return {
        ...state,
        bookType: action.bookType
      };
    case actionTypes.ENTER_SEARCH_FIELD:
      return {
        ...state,
        search: action.searchField
      };
    default:
      return state;
  }
};

export default reducer;
