import express from "express";
import { generateBookingReport } from "../../../database/reports/bookingReport.js";
import auth from "../../../core/middleware/auth.js";
const router = express.Router();
// Rota protegida
router.get("/booking-report/:token", auth, async (req, res) => {
    try {
        // Exemplo — aqui você usa seu model real:
        const bookings = [
            { cliente: "João", servico: "Corte", data: "2025-02-10 09:00", barbeiro: "Luiz" },
            { cliente: "Pedro", servico: "Barba", data: "2025-02-11 14:00", barbeiro: "Gabriel" },
        ];
        const doc = generateBookingReport(bookings);
        // Cabeçalhos para download sem salvar arquivo
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=booking-report.pdf");
        // Envia o PDF diretamente pro usuário
        doc.pipe(res);
        doc.end();
    }
    catch (error) {
        console.error("Erro ao gerar o PDF:", error);
        return res.status(500).send("Erro ao gerar relatório.");
    }
});
export default router;
//# sourceMappingURL=booking.js.map