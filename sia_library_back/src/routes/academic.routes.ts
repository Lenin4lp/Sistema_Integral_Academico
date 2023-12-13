import { Router } from "express";
import {
  getDegrees,
  getDegree,
  createDegree,
  updateDegree,
  deleteDegree,
} from "../controllers/degree.controller";
import {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import {
  degreeRegisterSchema,
  degreeUpdateSchema,
} from "../schemas/degree.schema";
import { registerSubjectSchema, updateSubjectSchema } from "../schemas/subject.schema";

const router = Router();

// ? Carrera

router.get("/degrees", getDegrees);
router.get("/degree/:id", getDegree);
router.post("/degree", validateSchema(degreeRegisterSchema), createDegree);
router.put("/degree/:id", validateSchema(degreeUpdateSchema), updateDegree);
router.delete("/degree/:id", deleteDegree);

// ? Materias

router.get("/subjects", getSubjects);
router.get("/subject/:id", getSubject);
router.post("/subject", validateSchema(registerSubjectSchema), createSubject);
router.put("/subject/:id", validateSchema(updateSubjectSchema), updateSubject);
router.delete("/subject/:id", deleteSubject);

export default router;
