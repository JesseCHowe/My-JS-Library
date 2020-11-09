import { combineReducers } from "redux";
import libraryReducer from "../reducers/myJSLibrary";
import authReducer from "../reducers/auth";
import filterReducer from "../reducers/libraryFilters";
import selectColor from "../reducers/colorSelection";

export default combineReducers({
  library: libraryReducer,
  auth: authReducer,
  filters: filterReducer,
  selectColor: selectColor,
});
