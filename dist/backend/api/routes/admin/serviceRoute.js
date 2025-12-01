import express from "express";
import { getAll, getById, register } from "../../controllers/admin/serviceController.js";
const router = express.Router();
router.get("/service", getAll);
router.get("/service/:id", getById);
router.post("/service", register);
export default router;
//# sourceMappingURL=serviceRoute.js.map