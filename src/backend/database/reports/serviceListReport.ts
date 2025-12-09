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

  const startX = 50;
  let y = doc.y + 10;

  const colCat = 110;
  const colNome = 120;
  const colDesc = 160;
  const colDur = 60;
  const colPreco = 70;

  const colWidths = [colCat, colNome, colDesc, colDur, colPreco];

  const colXPositions: number[] = [];
  let accX = startX;
  colXPositions.push(accX);
  for (let w of colWidths) {
    accX += w;
    colXPositions.push(accX);
  }
  const tableRightX = colXPositions[colXPositions.length - 1];

  doc.strokeColor("#000");
  doc.lineWidth(0.6);

  doc.font("Helvetica-Bold").fontSize(12);

  const headerTopY = y - 5;
  doc.moveTo(startX, headerTopY).lineTo(tableRightX, headerTopY).stroke();

  doc.text("Categoria", startX, y, { width: colCat, align: "center" });
  doc.text("Nome", startX + colCat, y, { width: colNome, align: "center" });
  doc.text(
    "Descrição",
    startX + colCat + colNome,
    y,
    { width: colDesc, align: "center" }
  );
  doc.text("Duração", startX + colCat + colNome + colDesc, y, {
    width: colDur,
    align: "center",
  });
  doc.text(
    "Preço",
    startX + colCat + colNome + colDesc + colDur,
    y,
    { width: colPreco, align: "center" }
  );

  y += 18;

  const headerBottomY = y;
  doc.moveTo(startX, headerBottomY).lineTo(tableRightX, headerBottomY).stroke();

  for (let i = 0; i < colXPositions.length; i++) {
    const x = colXPositions[i];
    doc.moveTo(x, headerTopY).lineTo(x, headerBottomY).stroke();
  }

  const rowHeight = 18;

  function drawVerticalLines(yStart: number, yEnd: number) {
    for (let i = 0; i < colXPositions.length; i++) {
      const x = colXPositions[i];
      doc.moveTo(x, yStart).lineTo(x, yEnd).stroke();
    }
  }

  doc.font("Helvetica").fontSize(11);
  services.forEach((s) => {
    const hCat = doc.heightOfString(s.categoria || "", { width: colCat });
    const hNome = doc.heightOfString(s.nome || "", { width: colNome });
    const hDesc = doc.heightOfString(s.descricao || "", { width: colDesc });
    const hDur = doc.heightOfString(String(s.duracao || "") + "m", { width: colDur });
    const hPreco = doc.heightOfString("R$ " + (s.preco || ""), { width: colPreco });

    const lineHeight = Math.max(rowHeight, hCat, hNome, hDesc, hDur, hPreco) + 6;

    const yStart = y - 3;
    const yEnd = y + lineHeight;

    const centerY = (textHeight: number) => y + (lineHeight - textHeight) / 2;

    doc.text(s.categoria || "", startX, centerY(hCat), {
      width: colCat,
      align: "center",
    });
    doc.text(s.nome || "", startX + colCat, centerY(hNome), {
      width: colNome,
      align: "center",
    });
    doc.text(s.descricao || "", startX + colCat + colNome, centerY(hDesc), {
      width: colDesc,
      align: "center",
    });
    doc.text(String(s.duracao || "") + "m", startX + colCat + colNome + colDesc, centerY(hDur), {
      width: colDur,
      align: "center",
    });
    doc.text("R$ " + (s.preco || ""), startX + colCat + colNome + colDesc + colDur, centerY(hPreco), {
      width: colPreco,
      align: "center",
    });

    drawVerticalLines(yStart, yEnd);

    doc.moveTo(startX, yEnd).lineTo(tableRightX, yEnd).stroke();

    // Avança y
    y = yEnd;
  });

  doc.moveTo(startX, y).lineTo(tableRightX, y).stroke();
  doc.moveTo(startX, headerTopY).lineTo(startX, y).stroke();
  doc.moveTo(tableRightX, headerTopY).lineTo(tableRightX, y).stroke();

  const bottom = doc.page.height - 50;
  doc
    .fontSize(10)
    .fillColor("#555")
    .text("© 2025 Osf Barbearia, Inc", 50, bottom - 15, {
      align: "center",
    });

  return doc;
}