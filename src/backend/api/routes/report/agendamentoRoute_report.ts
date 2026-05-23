// agendamentoRoute_report.ts

import express from "express";
import db from "../../../core/config/dbConnection.js";
import { generateAgendamentoReport } from "../../../database/reports/agendamentoReport.js";
import { findAllAgendamentos } from "../../../database/queries/agendamentoQuery.js";
import auth from "../../../core/middleware/auth.js";
import { RowDataPacket } from "mysql2";

const router = express.Router();

router.get("/agendamento-report/:token", auth, async (req, res) => {
  try {
    const { barbeiro, servico } = req.query;

    let query = findAllAgendamentos;
    const params: any[] = [];

    // Se for filtro por barbeiro, usa a query base e filtra em memória
    const [rows] = await db.query<RowDataPacket[]>(query, params);

    let agendamentos = rows as any[];

    if (barbeiro) {
      agendamentos = agendamentos.filter(a => String(a.funcionario_id) === String(barbeiro));
    }
    if (servico) {
      agendamentos = agendamentos.filter(a => String(a.servico_id) === String(servico));
    }

    const doc = generateAgendamentoReport(agendamentos);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=agendamentos.pdf");

    doc.pipe(res);
    doc.end();

  } catch (err) {
    console.error("❌ Agendamento Report:", err);
    res.status(500).send("Erro ao gerar relatório.");
  }
});

export default router;
