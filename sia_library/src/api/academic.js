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

// ? Grupo

export const getGroup = (id) => axios.get(`/group/${id}`);
export const getGroups = () => axios.get("/groups");
export const registerGroup = (group) => axios.post("/group", group);
export const updateGroup = (id, group) => axios.put(`/group/${id}`, group);
export const deleteGroup = (id) => axios.delete(`/group/${id}`);
export const assignStudentToGroup = (id, student) => axios.put(`/group/${id}/student`, student);
export const removeStudentFromGroup = (id, student) => axios.delete(`/group/${id}/student`, student);

// ? Notas

export const getGrade = (id) => axios.get(`/grade/${id}`);
export const getGrades = () => axios.get("/grades");
export const updateGrade = (id, grade) => axios.put(`/grade/${id}`, grade);