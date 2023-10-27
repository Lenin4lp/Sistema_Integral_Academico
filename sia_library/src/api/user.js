import axios from "./axios";

// ? Estudiantes

export const getStudent = (id) => axios.get(`/student/${id}`);
export const getStudents = () => axios.get("/students");
export const updateStudent = (id, student) => axios.put(`/student/${id}`, student);
export const assignStudentToSubject = (id, subject) => axios.put(`/student/${id}/subject`, subject);
export const removeStudentFromSubject = (id, subject) => axios.delete(`/student/${id}/subject`, subject);

// ? Docentes

export const getTeacher = (id) => axios.get(`/teacher/${id}`);
export const getTeachers = () => axios.get("/teachers");
export const updateTeacher = (id, teacher) => axios.put(`/teacher/${id}`, teacher);