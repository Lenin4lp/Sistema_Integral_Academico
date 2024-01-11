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
import { validateSchema } from "../middlewares/validator.middleware";
import {
  updateGroupSchema,
  registerGroupSchema,
  assignStudentToSubjectSchema,
} from "../schemas/group.schema";

const router = Router();

router.get("/groups", getGroups);
router.get("/group/:id", getGroup);
router.post("/group", validateSchema(registerGroupSchema), createGroup);
router.put("/group/:id", validateSchema(updateGroupSchema), updateGroup);
router.delete("/group/:id", deleteGroup);
router.post(
  "/groups/:id/students",
  validateSchema(assignStudentToSubjectSchema),
  addStudentToGroup
);

export default router;
