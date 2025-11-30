"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/global/pricingController");
router.get("/pricing", controller.page);
module.exports = router;
//# sourceMappingURL=pricingRoute.js.map