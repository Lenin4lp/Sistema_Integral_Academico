import axios from "./axios";

// ? Carrera

export const getDegree = (id) => axios.get(`/degree/${id}`);
export const getDegrees = () => axios.get("/degrees");
export const registerDegree = (degree) => axios.post("/degree", degree);
export const updateDegree = (id, degree) => axios.put(`/degree/${id}`, degree);
export const deleteDegree = (id) => axios.delete(`/degree/${id}`);

// ? Materia

export const getSubject = (id) => axios.get(`/subject/${id}`);
export const getSubjects = () => axios.get("/subjects");
export const registerSubject = (subject) => axios.post("/subject", subject);
export const updateSubject = (id, subject) => axios.put(`/subject/${id}`, subject);
export const deleteSubject = (id) => axios.delete(`/subject/${id}`);
