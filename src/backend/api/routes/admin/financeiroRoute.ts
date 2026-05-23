// financeiroRoute.ts

import express from "express";
import { page, confirmarPagamento, atualizarProduto } from "../../controllers/admin/financeiroController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/financeiro/:token", auth, page);
router.post("/financeiro/pagamento/:id/:token", auth, confirmarPagamento);
router.post("/financeiro/produto/:id/:token", auth, atualizarProduto);

export default router;
