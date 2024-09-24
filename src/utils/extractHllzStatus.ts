import { Sequelize } from "sequelize";
import Hallazgo from "../Model/HallazgoModel";
import InformeAuditoria from "../Model/InformeAuditoria";
import NvlRiesgoModel from "../Model/NvlRiesgoModel";
import RsgModel from "../Model/RsgModel";
import Auditor from "../Model/AuditModel";
import GerenciaResponsableHistorico from "../Model/GrcHistoricoModel";

export async function ExtracHllz_Estatus(
  estatus: string,
  paginas: number,
  yearInf: number | string
): Promise<string> {
  const cantidad = 7;
  const pagina: any = paginas;
  let estatu = estatus;
  console.log(estatu);

  if (estatu === "Seleccion%") {
    const hallazgos: any = await Hallazgo.findAll({
      // attributes: ['id_hallazgo', 'cod_informe','hallazgo_reportado','recomendacion','accion_correctiva','fecha_compromiso','fecha_cierre','fecha_creacion','estatus_Plan_Accion','cerrado','id_informe_auditoria','id_auditor_responsable','id_gerencia','id_nivel_riesgo','id_riesgo_asociado'],
      // attributes:['id_hallazgo'],
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
        cerrado: 0,
        created_year: yearInf,
      },
    });
    return hallazgos;
  }

  console.log(pagina);
  const hallazgos: any = await Hallazgo.findAll({
    // attributes: ['id_hallazgo', 'cod_informe','hallazgo_reportado','recomendacion','accion_correctiva','fecha_compromiso','fecha_cierre','fecha_creacion','estatus_Plan_Accion','cerrado','id_informe_auditoria','id_auditor_responsable','id_gerencia','id_nivel_riesgo','id_riesgo_asociado'],
    // attributes:['id_hallazgo'],
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
      estatus_Plan_Accion: estatu,
      created_year: yearInf,
    },
  });
  return hallazgos;
}
