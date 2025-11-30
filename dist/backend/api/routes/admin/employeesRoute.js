"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/employeesController");
router.get("/employees", controller.page);
module.exports = router;
//# sourceMappingURL=employeesRoute.js.map