import axios from "axios";

const extraText = (file) => {
  return axios.post("/upload", file);
};
const sharpen = (type, file) => {
  return axios.post("/sharp/" + type, file);
};
const classification = (file) => {
  return axios.post("/classification", file);
};

export { extraText, sharpen, classification };
