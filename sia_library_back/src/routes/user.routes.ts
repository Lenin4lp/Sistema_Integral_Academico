import { Router } from "express";
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;