// userListRoute_report.ts

import express from "express";
import { getAllUsers } from "../../models/usuarioModel.js";
import { generateUserListReport } from "../../../database/reports/userListReport.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/userList-report/:token", auth, async (req, res) => {
  try {
    const userList = await getAllUsers();

    const doc = generateUserListReport(userList);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=userList-report.pdf");

    doc.pipe(res);
    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar relatório.");
  }
});

export default router;