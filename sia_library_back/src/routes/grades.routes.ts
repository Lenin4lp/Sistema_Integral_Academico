import { Router } from "express";
import {
  getGrades,
  getGrade,
  createGrade,
  updateGrade,
  deleteGrade,
} from "../controllers/grades.controller";

const router = Router();

router.get("/grades", getGrades);
router.get("/grade/:id", getGrade);
router.post("/grade", createGrade);
router.put("/grade/:id", updateGrade);
router.delete("/grade/:id", deleteGrade);

export default router;
