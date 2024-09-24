import InformeAuditoria from "../Model/InformeAuditoria";
export async function generateUniqueCode(code: string): Promise<string> {
  let existingInforme = await InformeAuditoria.findOne({
    where: { cod_informe: code },
  });
  let count = 1;
  while (existingInforme) {
    const num = parseInt(code.slice(-9, -7));
    const updatedNum = String(num + 1).padStart(2, "0");
    const updatedCode = `${code.slice(0, -9)}${updatedNum}${code.slice(-7)}`;
    existingInforme = await InformeAuditoria.findOne({
      where: { cod_informe: updatedCode },
    });
    count++;
    code = updatedCode;
  }
  return code;
}
