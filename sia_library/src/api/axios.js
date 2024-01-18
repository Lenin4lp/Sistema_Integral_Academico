import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.istvc.edu.ec/api",
  withCredentials: true,
});

export default instance;
