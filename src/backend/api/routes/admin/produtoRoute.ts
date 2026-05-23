// produtoRoute.ts

import express from "express";
import { page, create, update, remove } from "../../controllers/admin/produtoController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/admin/produtos/:token",          auth, page);
router.post("/admin/produtos/:token",         auth, create);
router.post("/admin/produtos/:token/:id/edit",auth, update);
router.post("/admin/produtos/:token/:id/del", auth, remove);

export default router;
