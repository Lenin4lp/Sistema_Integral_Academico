import { Router } from "express";
import { getDegrees, getDegree, createDegree, updateDegree, deleteDegree } from "../controllers/degree.controller";
import { getSubjects, getSubject, createSubject, updateSubject, deleteSubject } from "../controllers/subject.controller";

const router = Router();

// ? Carrera

router.get("/degrees", getDegrees);
router.get("/degree/:id", getDegree);
router.post("/degree", createDegree);
router.put("/degree/:id", updateDegree);
router.delete("/degree/:id", deleteDegree);

// ? Materias

router.get("/subjects", getSubjects);
router.get("/subject/:id", getSubject);
router.post("/subject", createSubject);
router.put("/subject/:id", updateSubject);
router.delete("/subject/:id", deleteSubject);

export default router;
