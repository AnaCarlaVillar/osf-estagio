// agendamentoReport.ts

import PDFDocument from "pdfkit";

export function generateAgendamentoReport(agendamentos: any[]) {
  const doc = new PDFDocument({ margin: 50 });

  doc
    .fontSize(22)
    .fillColor("#000")
    .text("Relatório de Agendamentos", { align: "center" })
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

  const colCliente  = 170;
  const colBarbeiro = 160;
  const colData     = 100;
  const colHorario  = 70;

  const colWidths = [colCliente, colBarbeiro, colData, colHorario];

  const colXPositions: number[] = [];
  let accX = startX;
  colXPositions.push(accX);
  for (const w of colWidths) {
    accX += w;
    colXPositions.push(accX);
  }
  const tableRightX = colXPositions[colXPositions.length - 1];

  doc.strokeColor("#000").lineWidth(0.6);

  // Cabeçalho
  const headerTopY = y - 5;
  doc.moveTo(startX, headerTopY).lineTo(tableRightX, headerTopY).stroke();

  doc.font("Helvetica-Bold").fontSize(12);
  doc.text("Cliente",  startX,                               y, { width: colCliente,  align: "center" });
  doc.text("Barbeiro", startX + colCliente,                  y, { width: colBarbeiro, align: "center" });
  doc.text("Data",     startX + colCliente + colBarbeiro,    y, { width: colData,     align: "center" });
  doc.text("Horário",  startX + colCliente + colBarbeiro + colData, y, { width: colHorario, align: "center" });

  y += 20;
  doc.moveTo(startX, y).lineTo(tableRightX, y).stroke();

  function drawColLines(yStart: number, yEnd: number) {
    for (const x of colXPositions) {
      doc.moveTo(x, yStart).lineTo(x, yEnd).stroke();
    }
  }

  drawColLines(headerTopY, y);

  // Linhas
  doc.font("Helvetica").fontSize(11);

  if (agendamentos.length === 0) {
    doc.fillColor("#555").text("Nenhum agendamento encontrado.", startX, y + 10, { align: "center" });
  }

  agendamentos.forEach((a) => {
    const dtParts = String(a.data).split("T")[0].split("-");
    const dataFmt = dtParts.length === 3
      ? `${dtParts[2]}/${dtParts[1]}/${dtParts[0]}`
      : String(a.data);
    const horaFmt = String(a.hora).substring(0, 5);

    const hCli  = doc.heightOfString(a.cliente_nome   || "", { width: colCliente  });
    const hBar  = doc.heightOfString(a.funcionario_nome|| "", { width: colBarbeiro });
    const hDat  = doc.heightOfString(dataFmt,                  { width: colData    });
    const hHor  = doc.heightOfString(horaFmt,                  { width: colHorario });

    const rowH  = Math.max(18, hCli, hBar, hDat, hHor) + 8;
    const yStart = y - 3;
    const yEnd   = y + rowH;
    const center = (h: number) => y + (rowH - h) / 2;

    doc.fillColor("#000");
    doc.text(a.cliente_nome    || "—", startX,                               center(hCli), { width: colCliente,  align: "center" });
    doc.text(a.funcionario_nome|| "—", startX + colCliente,                  center(hBar), { width: colBarbeiro, align: "center" });
    doc.text(dataFmt,                  startX + colCliente + colBarbeiro,    center(hDat), { width: colData,     align: "center" });
    doc.text(horaFmt,                  startX + colCliente + colBarbeiro + colData, center(hHor), { width: colHorario, align: "center" });

    drawColLines(yStart, yEnd);
    doc.moveTo(startX, yEnd).lineTo(tableRightX, yEnd).stroke();

    y = yEnd;
  });

  // Borda final
  doc.moveTo(startX, headerTopY).lineTo(startX, y).stroke();
  doc.moveTo(tableRightX, headerTopY).lineTo(tableRightX, y).stroke();

  // Rodapé
  const bottom = doc.page.height - 50;
  doc
    .fontSize(10)
    .fillColor("#555")
    .text("© 2025 Osf Barbearia, Inc", 50, bottom - 15, { align: "center" });

  return doc;
}
