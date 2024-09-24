export async function JoinComent(coments: any, auditores: any): Promise<string> {

  const comentsUnificados = [];

  for (const coment of coments) {
    const auditor = auditores.find((auditor: any) => auditor.id_auditor_responsable === coment.id_auditor_responsable)
    if (auditor) {

      if (auditor) {
        coment.id_auditor_responsable = auditor
      }

      comentsUnificados.push({
        ...coment,
      });
    }
  }


  const comentsData: any = comentsUnificados.map((comentsUnificados) => comentsUnificados.dataValues);
  return comentsData;
}

