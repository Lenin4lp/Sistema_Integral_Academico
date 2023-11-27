import { Router } from "express";
import {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  addStudentToGroup,
  deleteStudentFromGroup,
} from "../controllers/group.controller";

const router = Router();

router.get("/groups", getGroups);
router.get("/group/:id", getGroup);
router.post("/group", createGroup);
router.put("/group/:id", updateGroup);
router.delete("/group/:id", deleteGroup);
router.post("/groups/:id/students", addStudentToGroup);
router.delete("/groups/:id/students", deleteStudentFromGroup);

export default router;
