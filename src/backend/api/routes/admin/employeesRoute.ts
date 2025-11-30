const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/employeesController");

router.get("/employees", controller.page);

module.exports = router;