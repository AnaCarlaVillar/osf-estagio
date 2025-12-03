// serviceListRoute_report.ts

import express from "express";
import { getAll } from "../../models/servicoModel.js";
import { generateServiceListReport } from "../../../database/reports/serviceListReport.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/serviceList-report/:token", auth, async (req, res) => {
  try {
    const serviceList = await getAll();

    const doc = generateServiceListReport(serviceList);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=serviceList-report.pdf");

    doc.pipe(res);
    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar relatório.");
  }
});

export default router;