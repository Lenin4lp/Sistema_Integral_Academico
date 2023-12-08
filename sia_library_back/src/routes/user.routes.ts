import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { updateSchema } from "../schemas/auth.schema";
import { validateSchema } from "../middlewares/validator.middleware";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.get("/users", authRequired, getUsers);
router.get("/user/:id", authRequired, getUser);
router.put("/user/:id", authRequired, validateSchema(updateSchema), updateUser);
router.delete("/user/:id", authRequired, deleteUser);

export default router;
