import { Router } from "express";
import {
  getPeriods,
  getPeriod,
  createPeriod,
  updatePeriod,
  deletePeriod,
} from "../controllers/period.controller";

const router = Router();

router.get("/periods", getPeriods);
router.get("/period/:id", getPeriod);
router.post("/period", createPeriod);
router.put("/period/:id", updatePeriod);
router.delete("/period/:id", deletePeriod);

export default router;
