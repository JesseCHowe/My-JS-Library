import * as actionTypes from "../actions/actionTypes";

const initialState = {
  color: "blue",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLOR:
      return {
        color: action.method,
      };
    default:
      return state;
  }
};

export default reducer;
