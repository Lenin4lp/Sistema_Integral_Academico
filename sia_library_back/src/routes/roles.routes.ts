import { Router } from "express";
import {
  getStudent,
  getStudents,
  updateStudent,
  assignStudentToSubject,
  removeStudentFromSubject,
} from "../controllers/student.controller";
import {
  getTeacher,
  getTeachers,
  updateTeacher,
} from "../controllers/teacher.controller";

const router = Router();

// ? Estudiantes

router.get("/students", getStudents);
router.get("/student/:id", getStudent);
router.put("/student/:id", updateStudent);
router.post("/student/:id/subject", assignStudentToSubject);
router.delete("/student/:id/subject", removeStudentFromSubject);

// ? Docentes

router.get("/teachers", getTeachers);
router.get("/teacher/:id", getTeacher);
router.put("/teacher/:id", updateTeacher);

export default router;
