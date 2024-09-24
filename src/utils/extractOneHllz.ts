import { Sequelize } from "sequelize";
import Hallazgo from "../Model/HallazgoModel";
import InformeAuditoria from "../Model/InformeAuditoria";
import NvlRiesgoModel from "../Model/NvlRiesgoModel";
import RsgModel from "../Model/RsgModel";
import Auditor from "../Model/AuditModel";
import GerenciaResponsableHistorico from "../Model/GrcHistoricoModel";

export async function ExtracOneHllz(id: any): Promise<string> {
  let hallazgos: any = await Hallazgo.findAll({
    where: {
      id_hallazgo: id,
    },
    include: [
      {
        model: InformeAuditoria,
        attributes: ["nombre_informe", "cod_informe"],
      },
      {
        model: NvlRiesgoModel,
        attributes: ["nombre_nivel_riesgo" as "nivelRiesgo"],
      },
      {
        model: RsgModel,
        attributes: ["nombre_riesgo_asociado"],
      },
      {
        model: Auditor,
        attributes: ["id_auditor_responsable", "nombre", "apellido"],
      }, {
        model: GerenciaResponsableHistorico,
        attributes: ["id_gerencia_historico", "gerencia_historico"]
      }
    ],
  });



  return hallazgos;
}


