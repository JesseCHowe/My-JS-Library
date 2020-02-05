import * as actionTypes from "./actionTypes";

export const chooseSortMethod = method => {
  return {
    type: actionTypes.CHOOSE_SORT_METHOD,
    method: method
  };
};

export const chooseBookType = bookType => {
  return {
    type: actionTypes.CHOOSE_BOOK_TYPE,
    bookType: bookType
  };
};

export const enterSearchField = searchField => {
  return {
    type: actionTypes.ENTER_SEARCH_FIELD,
    searchField: searchField
  };
};
