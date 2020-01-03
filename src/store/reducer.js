import * as actionTypes from "./actions";

const initialState = {
  myJSBooks: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return {};
    case actionTypes.REMOVE_BOOK:
      return {};
    default:
      return state;
  }
};

export default reducer;
