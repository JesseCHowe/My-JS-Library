import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import throttle from "lodash/throttle";
import { loadState, saveState } from "../localStorage";
import thunk from "redux-thunk";

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      selectColor: {
        color: store.getState().selectColor.color,
      },
    });
  }, 1000)
);

export default store;
