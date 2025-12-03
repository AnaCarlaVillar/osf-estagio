// serviceListReport.ts

import PDFDocument from "pdfkit";

export function generateServiceListReport(services: any[]) {
  const doc = new PDFDocument({ margin: 50 });

  doc
    .fontSize(22)
    .fillColor("#000")
    .text("Relatório de Serviços", { align: "center" })
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

  services.forEach((s) => {
    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor("#cccccc")
      .stroke()
      .moveDown(2);

    doc
      .fillColor("#000")
      .fontSize(13)
      .text("Categoria: ", { continued: true })
      .font("Helvetica-Bold")
      .text(s.categoria)
      .font("Helvetica")
      .moveDown(0.3);

    doc
      .fontSize(13)
      .text("Nome: ", { continued: true })
      .font("Helvetica-Bold")
      .text(s.nome)
      .font("Helvetica")
      .moveDown(0.3);

    doc
      .fontSize(13)
      .text("Descrição: ", { continued: true })
      .font("Helvetica-Bold")
      .text(s.descricao || "")
      .font("Helvetica")
      .moveDown(0.3);

    doc
      .fontSize(13)
      .text("Duração: ", { continued: true })
      .font("Helvetica-Bold")
      .text(s.duracao)
      .font("Helvetica")
      .moveDown(0.3);

    doc
      .fontSize(13)
      .text("Preço: ", { continued: true })
      .font("Helvetica-Bold")
      .text(`R$ ${s.preco}`)
      .font("Helvetica")
      .moveDown(0.8);

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