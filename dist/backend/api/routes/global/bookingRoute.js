"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/global/bookingController");
router.get("/booking", controller.page);
module.exports = router;
//# sourceMappingURL=bookingRoute.js.map