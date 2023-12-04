import axios from "axios";

const instance = axios.create({
  baseURL: "https://sia-api.istvc.edu.ec/api",
  withCredentials: true,
});

export default instance;
