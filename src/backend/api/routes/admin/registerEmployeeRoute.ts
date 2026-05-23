// registerEmployeeRoute.ts

import express from "express";
import { page, register, editSave } from "../../controllers/admin/registerEmployeeController.js";
import authAdmin from "../../../core/middleware/authAdmin.js";

const router = express.Router();

router.get("/admin/register-employee/:token",          authAdmin, page);
router.post("/admin/register-employee/:token",         authAdmin, register);
router.post("/admin/edit-employee/:token/:id",         authAdmin, editSave);

export default router;
