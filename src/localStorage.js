export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("color");
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("color", serializedState);
  } catch {}
};
