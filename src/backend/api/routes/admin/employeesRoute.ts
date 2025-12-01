import express from "express";
import { page } from "../../controllers/admin/employeesController.js";
import auth from "../../../core/middleware/token/auth.js";

const router = express.Router();

router.get("/employees", auth, page);

export default router;