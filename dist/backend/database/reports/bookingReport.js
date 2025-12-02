import PDFDocument from "pdfkit";
export function generateBookingReport(bookings) {
    const doc = new PDFDocument({ margin: 50 });
    // Cabeçalho
    doc
        .fontSize(22)
        .fillColor("#000")
        .text("Relatório de Agendamentos", { align: "center" })
        .moveDown(1);
    // Data de geração
    const creationDate = new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
    doc
        .fontSize(10)
        .fillColor("#555")
        .text(`Gerado em: ${creationDate}`, { align: "right" })
        .moveDown(1);
    // Linha separadora
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor("#cccccc")
        .stroke()
        .moveDown(2);
    // Conteúdo
    bookings.forEach((b, index) => {
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
        doc.moveDown(1);
        // Separador entre registros (opcional)
        if (index < bookings.length - 1) {
            doc
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .strokeColor("#e0e0e0")
                .stroke()
                .moveDown(1.5);
        }
    });
    return doc;
}
//# sourceMappingURL=bookingReport.js.map