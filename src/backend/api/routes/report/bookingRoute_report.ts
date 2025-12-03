// bookingRoute_report.ts

import express from "express";
import { findById } from "../../models/usuarioModel.js";
import { generateBookingReport } from "../../../database/reports/bookingReport.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/booking-report/:token", auth, async (req, res) => {
  try {
    const { service, barber, datetime } = req.query;

    if (!service || !barber || !datetime) {
      return res.status(400).send("Dados de agendamento incompletos.");
    }

    const raw = String(datetime);

    const [datePart, timePart] = raw.split("T");

    if (!datePart || !timePart) {
      return res.status(400).send("Formato de datetime inválido.");
    }

    const parts = datePart.split("-");

    if (parts.length !== 3) {
      return res.status(400).send("Data inválida.");
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return res.status(400).send("Data inválida.");
    }

    const formattedDate = new Date(year, month - 1, day).toLocaleDateString("pt-BR");
    const formattedTime = timePart.slice(0, 5);

    const userId = Number(req.user!.id);
    const user = await findById(userId);

    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }

    const booking = [
      {
        cliente: user.email,
        servico: service,
        barbeiro: barber,
        data: formattedDate,
        horario: formattedTime,
      },
    ];

    const doc = generateBookingReport(booking);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=booking-report.pdf");

    doc.pipe(res);
    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar relatório.");
  }
});

export default router;