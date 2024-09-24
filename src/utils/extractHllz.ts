import { Sequelize, where } from "sequelize";
import Hallazgo from "../Model/HallazgoModel";
import InformeAuditoria from "../Model/InformeAuditoria";
import NvlRiesgoModel from "../Model/NvlRiesgoModel";
import RsgModel from "../Model/RsgModel";
import Auditor from "../Model/AuditModel";
import GerenciaResponsableHistorico from "../Model/GrcHistoricoModel";

export async function ExtracHllz(
  paginas: number,
  yearData: number | string
): Promise<string> {
  const cantidad = 7;
  const pagina: any = 1;
  const hallazgos: any = await Hallazgo.findAll({
    include: [
      {
        model: InformeAuditoria,
        attributes: ["nombre_informe", "cod_informe"],
      },
      {
        model: NvlRiesgoModel,
        attributes: ["nombre_nivel_riesgo"],
      },
      {
        model: RsgModel,
        attributes: ["nombre_riesgo_asociado"],
      },
      {
        model: Auditor,
        attributes: ["id_auditor_responsable", "nombre", "apellido"],
      },
      {
        model: GerenciaResponsableHistorico,
        attributes: ["id_gerencia_historico", "gerencia_historico"],
      },
    ],
    where: {
      created_year: yearData,
    },
    limit: cantidad,
    offset: (paginas - 1) * cantidad,
    order: [[Sequelize.col("fecha_creacion"), "desc"]],
  });
  return hallazgos;
}
