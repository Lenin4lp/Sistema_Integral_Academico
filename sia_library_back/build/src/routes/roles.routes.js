"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const teacher_controller_1 = require("../controllers/teacher.controller");
const router = (0, express_1.Router)();
// ? Estudiantes
router.get("/students", student_controller_1.getStudents);
router.get("/student/:id", student_controller_1.getStudent);
router.put("/student/:id", student_controller_1.updateStudent);
router.post("/student/:id/subject", student_controller_1.assignStudentToSubject);
router.delete("/student/:id/subject", student_controller_1.removeStudentFromSubject);
// ? Docentes
router.get("/teachers", teacher_controller_1.getTeachers);
router.get("/teacher/:id", teacher_controller_1.getTeacher);
router.put("/teacher/:id", teacher_controller_1.updateTeacher);
exports.default = router;
