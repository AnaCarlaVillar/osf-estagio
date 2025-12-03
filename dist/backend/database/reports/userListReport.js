// userListReport.ts
import PDFDocument from "pdfkit";
export function generateUserListReport(users) {
    const doc = new PDFDocument({ margin: 50 });
    doc
        .fontSize(22)
        .fillColor("#000")
        .text("Relatório de Usuários", { align: "center" })
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
    users.forEach((u) => {
        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .strokeColor("#cccccc")
            .stroke()
            .moveDown(2);
        doc
            .fillColor("#000")
            .fontSize(13)
            .text("Id Pessoa: ", { continued: true })
            .font("Helvetica-Bold")
            .text(u.pessoa_id)
            .font("Helvetica")
            .moveDown(0.3);
        doc
            .fontSize(13)
            .text("Id Usuário: ", { continued: true })
            .font("Helvetica-Bold")
            .text(u.usuario_id)
            .font("Helvetica")
            .moveDown(0.3);
        doc
            .fontSize(13)
            .text("Nome: ", { continued: true })
            .font("Helvetica-Bold")
            .text(u.nome)
            .font("Helvetica")
            .moveDown(0.3);
        doc
            .fontSize(13)
            .text("Email: ", { continued: true })
            .font("Helvetica-Bold")
            .text(u.email)
            .font("Helvetica")
            .moveDown(0.3);
        doc
            .fontSize(13)
            .text("Ativo: ", { continued: true })
            .font("Helvetica-Bold")
            .text(u.ativo ? "Sim" : "Não")
            .font("Helvetica")
            .moveDown(0.3);
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
//# sourceMappingURL=userListReport.js.map