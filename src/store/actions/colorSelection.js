import * as actionTypes from "./actionTypes";

export const setColor = (color) => {
  return {
    type: actionTypes.SET_COLOR,
    method: color,
  };
};
