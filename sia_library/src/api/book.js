import axios from "./axios";

export const getBook = (id) => axios.get(`/book/${id}`);
export const getBooks = () => axios.get("/books");
export const createBook = (book) => axios.post("/book", book);