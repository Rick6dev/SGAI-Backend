export async function Join(
  hallazgos: any,
  gerencias: any,
  auditores: any
): Promise<string> {
  const hallazgosUnificados = [];
  for (let hallazgo of hallazgos) {
    if (hallazgo.id_gerencia != 0) {
      const gerencia = gerencias.find(
        (gerencia: any) => gerencia.id_gerencia === hallazgo.id_gerencia
      );
      if (gerencia) {
        hallazgo.gerencia_responsable_historico.gerencia_historico =
          gerencia.nombre_gerencia;
        hallazgo.id_gerencia_historico = gerencia;
        hallazgo.gerencia = gerencia;

        // hallazgo.gerencia_responsable_historico.id_gerencia_historico =
        //   gerencia.intra_vp.nombre_vp;
      }
    }
    // hallazgo.id_nivel_riesgo = hallazgo.Nivel_Riesgo.nombre_nivel_riesgo;
    hallazgosUnificados.push({
      ...hallazgo,
    });
  }
  const hallazgosData: any = hallazgosUnificados.map(
    (hallazgosUnificado) => hallazgosUnificado.dataValues
  );
  return hallazgosData;
}
