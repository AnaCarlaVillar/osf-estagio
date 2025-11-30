const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/categoryController");

router.get("/category", controller.getAll);
router.get("/category/:id", controller.getById);
router.post("/category", controller.register);

module.exports = router;
