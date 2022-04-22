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
const duoTone = (formData) => {
  return axios.post("/duo-tone", formData);
};
const brightNess = (formData) => {
  return axios.post("/brightness", formData);
};
const emBoss = (formData) => {
  return axios.post("/emboss", formData);
};
const tv60 = (formData) => {
  return axios.post("/tv-60", formData);
};
const sepia = (formData) => {
  return axios.post("/sepia", formData);
};

export {
  extraText,
  sharpen,
  classification,
  duoTone,
  brightNess,
  emBoss,
  tv60,
  sepia,
};
