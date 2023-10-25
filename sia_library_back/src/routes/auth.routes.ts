import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post("/register", validateSchema(registerSchema), register);
router.get("/verify", verifyToken);

export default router;
