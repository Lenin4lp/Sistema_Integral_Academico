"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const degree_controller_1 = require("../controllers/degree.controller");
const subject_controller_1 = require("../controllers/subject.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const degree_schema_1 = require("../schemas/degree.schema");
const subject_schema_1 = require("../schemas/subject.schema");
const router = (0, express_1.Router)();
// ? Carrera
router.get("/degrees", degree_controller_1.getDegrees);
router.get("/degree/:id", degree_controller_1.getDegree);
router.post("/degree", (0, validator_middleware_1.validateSchema)(degree_schema_1.degreeRegisterSchema), degree_controller_1.createDegree);
router.put("/degree/:id", (0, validator_middleware_1.validateSchema)(degree_schema_1.degreeUpdateSchema), degree_controller_1.updateDegree);
router.delete("/degree/:id", degree_controller_1.deleteDegree);
// ? Materias
router.get("/subjects", subject_controller_1.getSubjects);
router.get("/subject/:id", subject_controller_1.getSubject);
router.post("/subject", (0, validator_middleware_1.validateSchema)(subject_schema_1.registerSubjectSchema), subject_controller_1.createSubject);
router.put("/subject/:id", (0, validator_middleware_1.validateSchema)(subject_schema_1.updateSubjectSchema), subject_controller_1.updateSubject);
router.delete("/subject/:id", subject_controller_1.deleteSubject);
exports.default = router;
