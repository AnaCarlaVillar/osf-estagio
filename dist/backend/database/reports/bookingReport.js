import PDFDocument from "pdfkit";
export function generateBookingReport(bookings) {
    const doc = new PDFDocument({ margin: 50 });
    doc
        .fontSize(22)
        .fillColor("#000")
        .text("Relatório de Agendamento", { align: "center" })
        .moveDown(1);
    const creationDate = new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
    doc
        .fontSize(10)
        .fillColor("#555")
        .text(`Gerado em: ${creationDate}`, { align: "right" })
        .moveDown(1);
    bookings.forEach((b) => {
        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .strokeColor("#cccccc")
            .stroke()
            .moveDown(2);
        doc
            .fillColor("#000")
            .fontSize(13)
            .text(`Cliente: `, { continued: true })
            .font("Helvetica-Bold")
            .text(b.cliente)
            .font("Helvetica");
        doc
            .fontSize(13)
            .text(`Serviço: `, { continued: true })
            .font("Helvetica-Bold")
            .text(b.servico)
            .font("Helvetica");
        doc
            .fontSize(13)
            .text(`Barbeiro: `, { continued: true })
            .font("Helvetica-Bold")
            .text(b.barbeiro)
            .font("Helvetica");
        doc
            .fontSize(13)
            .text(`Data: `, { continued: true })
            .font("Helvetica-Bold")
            .text(b.data)
            .font("Helvetica");
        doc
            .fontSize(13)
            .text(`Horário: `, { continued: true })
            .font("Helvetica-Bold")
            .text(b.horario)
            .font("Helvetica");
        function addFooter() {
            const bottom = doc.page.height - 50;
            doc
                .fontSize(10)
                .fillColor("#555")
                .text("© 2025 Osf Barbearia, Inc", 50, bottom - 15, {
                align: "center",
            });
        }
        addFooter();
        doc.moveDown(1);
    });
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor("#cccccc")
        .stroke()
        .moveDown(2);
    return doc;
}
//# sourceMappingURL=bookingReport.js.map