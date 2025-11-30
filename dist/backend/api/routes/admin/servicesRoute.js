"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/servicesController");
router.get("/services", controller.page);
module.exports = router;
//# sourceMappingURL=servicesRoute.js.map