"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentGroup_controller_1 = require("../controllers/studentGroup.controller");
const router = (0, express_1.Router)();
router.delete("/groups/:id/:studentId", studentGroup_controller_1.removeStudentFromGroup);
exports.default = router;
