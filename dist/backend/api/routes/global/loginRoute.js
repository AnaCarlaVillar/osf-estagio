"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/global/loginController");
router.get("/login", controller.page);
router.post("/login", controller.login);
module.exports = router;
//# sourceMappingURL=loginRoute.js.map