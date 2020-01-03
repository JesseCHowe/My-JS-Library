import axios from "axios";

const instance = axios.create({
  baseURL: "https://myjs-library.firebaseio.com/"
});

export default instance;
