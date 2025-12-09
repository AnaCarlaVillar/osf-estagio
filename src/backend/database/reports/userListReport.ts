import PDFDocument from "pdfkit";

export function generateUserListReport(users: any[]) {
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

  const startX = 50;
  let y = doc.y + 10;

  const colPessoa = 70;
  const colUsuario = 70;
  const colNome = 150;
  const colEmail = 170;
  const colAtivo = 50;

  const colWidths = [colPessoa, colUsuario, colNome, colEmail, colAtivo];

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

  doc.text("Id Pessoa", startX, y, { width: colPessoa, align: "center" });
  doc.text("Id Usuário", startX + colPessoa, y, { width: colUsuario, align: "center" });
  doc.text("Nome", startX + colPessoa + colUsuario, y, { width: colNome, align: "center" });
  doc.text(
    "Email",
    startX + colPessoa + colUsuario + colNome,
    y,
    { width: colEmail, align: "center" }
  );
  doc.text(
    "Ativo",
    startX + colPessoa + colUsuario + colNome + colEmail,
    y,
    { width: colAtivo, align: "center" }
  );

  y += 18;

  const headerBottomY = y;
  doc.moveTo(startX, headerBottomY).lineTo(tableRightX, headerBottomY).stroke();

  for (let x of colXPositions) {
    doc.moveTo(x, headerTopY).lineTo(x, headerBottomY).stroke();
  }

  const rowHeight = 16;

  function drawVerticalLines(yStart: number, yEnd: number) {
    for (let x of colXPositions) {
      doc.moveTo(x, yStart).lineTo(x, yEnd).stroke();
    }
  }

  doc.font("Helvetica").fontSize(11);

  users.forEach((u) => {
    const hPessoa = doc.heightOfString(String(u.pessoa_id), { width: colPessoa });
    const hUsuario = doc.heightOfString(String(u.usuario_id), { width: colUsuario });
    const hNome = doc.heightOfString(u.nome, { width: colNome });
    const hEmail = doc.heightOfString(u.email, { width: colEmail });
    const hAtivo = doc.heightOfString(u.ativo ? "Sim" : "Não", { width: colAtivo });

    const lineHeight = Math.max(rowHeight, hPessoa, hUsuario, hNome, hEmail, hAtivo) + 4;

    const yStart = y - 3;
    const yEnd = y + lineHeight;

    const centerY = (h: number) => y + (lineHeight - h) / 2;

    doc.text(String(u.pessoa_id), startX, centerY(hPessoa), {
      width: colPessoa,
      align: "center",
    });

    doc.text(String(u.usuario_id), startX + colPessoa, centerY(hUsuario), {
      width: colUsuario,
      align: "center",
    });

    doc.text(u.nome, startX + colPessoa + colUsuario, centerY(hNome), {
      width: colNome,
      align: "center",
    });

    doc.text(u.email, startX + colPessoa + colUsuario + colNome, centerY(hEmail), {
      width: colEmail,
      align: "center",
    });

    doc.text(u.ativo ? "Sim" : "Não", startX + colPessoa + colUsuario + colNome + colEmail, centerY(hAtivo), {
      width: colAtivo,
      align: "center",
    });

    drawVerticalLines(yStart, yEnd);

    doc.moveTo(startX, yEnd).lineTo(tableRightX, yEnd).stroke();

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