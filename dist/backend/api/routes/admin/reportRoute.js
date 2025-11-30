"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/reportController");
router.get("/report", controller.page);
module.exports = router;
//# sourceMappingURL=reportRoute.js.map