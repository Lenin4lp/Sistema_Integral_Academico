"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const degree_controller_1 = require("../controllers/degree.controller");
const subject_controller_1 = require("../controllers/subject.controller");
const router = (0, express_1.Router)();
// ? Carrera
router.get("/degrees", degree_controller_1.getDegrees);
router.get("/degree/:id", degree_controller_1.getDegree);
router.post("/degree", degree_controller_1.createDegree);
router.put("/degree/:id", degree_controller_1.updateDegree);
router.delete("/degree/:id", degree_controller_1.deleteDegree);
// ? Materias
router.get("/subjects", subject_controller_1.getSubjects);
router.get("/subject/:id", subject_controller_1.getSubject);
router.post("/subject", subject_controller_1.createSubject);
router.put("/subject/:id", subject_controller_1.updateSubject);
router.delete("/subject/:id", subject_controller_1.deleteSubject);
exports.default = router;
