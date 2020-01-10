import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  token: null,
  userId: null,
  error: null,
  loading: false,
  displayForm: false
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true
  };
};

const authDisplay = (state, action) => {
  return {
    ...state,
    displayForm: !state.displayForm
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    displayForm: false
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    user: null,
    userId: null
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_DISPLAY:
      return authDisplay(state, action);
    default:
      return state;
  }
};

export default reducer;
