import { Router } from "express";
import {
  getPeriods,
  getPeriod,
  createPeriod,
  updatePeriod,
  deletePeriod,
} from "../controllers/period.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { updatePeriodSchema, registerPeriodSchema } from "../schemas/period.schema";

const router = Router();

router.get("/periods", getPeriods);
router.get("/period/:id", getPeriod);
router.post("/period", validateSchema(registerPeriodSchema), createPeriod);
router.put("/period/:id", validateSchema(updatePeriodSchema), updatePeriod);
router.delete("/period/:id", deletePeriod);

export default router;
