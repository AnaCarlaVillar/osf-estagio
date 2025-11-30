"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/serviceController");
router.get("/service", controller.getAll);
router.get("/service/:id", controller.getById);
router.post("/service", controller.register);
module.exports = router;
//# sourceMappingURL=serviceRoute.js.map