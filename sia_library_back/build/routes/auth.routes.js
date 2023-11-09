"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const router = (0, express_1.Router)();
router.post("/login", (0, validator_middleware_1.validateSchema)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.post("/register", (0, validator_middleware_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.register);
router.get("/verify", auth_controller_1.verifyToken);
exports.default = router;