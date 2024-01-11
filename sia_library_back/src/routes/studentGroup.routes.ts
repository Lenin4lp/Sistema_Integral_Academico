import { Router } from "express";
import {
  addStudentToGroup,
  removeStudentFromGroup,
} from "../controllers/studentGroup.controller";

const router = Router();

router.delete("/groups/:id/:studentId", removeStudentFromGroup);

export default router;
