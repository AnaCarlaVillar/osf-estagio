const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/servicesController");

router.get("/services", controller.page);

module.exports = router;