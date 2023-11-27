import { Router } from "express";
import {
  getModality,
  getModalities,
  createModality,
  updateModality,
  deleteModality,
} from "../controllers/modality.controller";

const router = Router();

router.post("/modality", createModality);
router.put("/modality/:id", updateModality);
router.get("/modalities", getModalities);
router.get("/modality/:id", getModality);
router.delete("/modality/:id", deleteModality);

export default router;
