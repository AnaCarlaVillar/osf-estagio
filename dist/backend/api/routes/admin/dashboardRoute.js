"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/dashboardController");
router.get("/dashboard", controller.page);
module.exports = router;
//# sourceMappingURL=dashboardRoute.js.map