import { Request, Response } from "express";
// import { connectAuditDatabase, connectMainDatabase } from '../database';
import moment from "moment";
import Hallazgo from "../Model/HallazgoModel";
import InformeAuditoria from "../Model/InformeAuditoria";
import NvlRiesgoModel from "../Model/NvlRiesgoModel";
import RsgModel from "../Model/RsgModel";
import HallazgoSeguimiento from "../Model/HallazgoSeguimiento";
import { CountOptions, Model, Sequelize } from "sequelize";
import { auditSequelize, sequelize } from "../database";
import keys from "../keys";
import GrcModel from "../Model/GrcModel";
import VpModel from "../Model/VPModel";
import VpeModel from "../Model/VPEModel";
import { Join } from "../utils/join";
import { ExtracGrc } from "../utils/extractGrc";
import { ExtracHllz } from "../utils/extractHllz";
import { ExtracOneHllz } from "../utils/extractOneHllz";
import { ExtractEmpleado } from "../utils/extractEmpleados";
import { paginar } from "../utils/pagination";
import { ExtracHllz_Estatus } from "../utils/extractHllzStatus";
import { ExtractEmpleadoComentr } from "../utils/extractComent";
import { JoinComent } from "../utils/JoinComent";
import { ExtracHllz_GrcAud } from "../utils/extractHllzGrcAud";
import Auditor from "../Model/AuditModel";
import { reportGerencia } from "../utils/reportGerencia";
import { extractVp } from "../utils/extractVP";
import { ExtractsAllGerencia } from "../utils/extracrGrcsReport";
import { extractVpe } from "../utils/extractVPE";
import GerenciaResponsableHistorico from "../Model/GrcHistoricoModel";
export class HallazgoController {
  public async groupHallazgo(req: Request, res: Response): Promise<void> {
    try {
      let cerrados: any = [];
      let abiertos: any = [];
      let totales: any = [];
      cerrados = await Hallazgo.findAll({
        attributes: [
          [Sequelize.fn("YEAR", sequelize.col("created_year")), "created_year"],
          [Sequelize.fn("COUNT", "*"), "total"], // Count all hallazgos
          [
            Sequelize.fn("COUNT", sequelize.col("cerrado")), // Count closed hallazgos
            "total_cerrados",
          ],

          [Sequelize.col("id_gerencia_encargada"), "id_gerencia_encargada"],
        ],
        where: {
          cerrado: 1,
        },
        group: ["created_year", "id_gerencia_encargada"],
        order: [[Sequelize.col("created_year"), "DESC"]],
      });

      abiertos = await Hallazgo.findAll({
        attributes: [
          [Sequelize.fn("YEAR", sequelize.col("created_year")), "created_year"],
          [Sequelize.fn("COUNT", "*"), "total"], // Count all hallazgos
          [
            Sequelize.fn("COUNT", sequelize.col("cerrado")), // Count closed hallazgos
            "total_abiertos",
          ],

          [Sequelize.col("id_gerencia_encargada"), "id_gerencia_encargada"],
        ],
        where: {
          cerrado: 0,
        },
        group: ["created_year", "id_gerencia_encargada"],
        order: [[Sequelize.col("created_year"), "DESC"]],
      });
      totales = await Hallazgo.findAll({
        attributes: [
          "id_gerencia_encargada",
          "created_year",
          [
            sequelize.fn(
              "SUM",
              sequelize.literal("CASE WHEN cerrado = 1 THEN 1 ELSE 0 END")
            ),
            "casos_cerrados",
          ],
          [
            sequelize.fn(
              "SUM",
              sequelize.literal("CASE WHEN cerrado = 0 THEN 1 ELSE 0 END")
            ),
            "casos_abiertos",
          ],
          [sequelize.fn("COUNT", sequelize.col("id_hallazgo")), "total_casos"], // Cambié COUNT(*) por COUNT(id_hallazgo)
        ],
        group: ["id_gerencia_encargada", "created_year"],
        order: [
          ["created_year", "DESC"],
          ["id_gerencia_encargada", "ASC"],
        ],
      });
      const results = {
        totales,

        cerrados,
        abiertos,
      };

      if (cerrados.length === 0) {
        res.status(204).json({ message: "No fueron encontrados casos" });
      } else {
        res.status(200).json(results);
      }
    } catch (error) {
      res.status(500).json({
        message: `${error}`,
      });
    }
  }
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const today = new Date();
      const year = today.getFullYear();
      let {
        detalle,
        fecha_compromiso,
        recomendacion,
        id_riesgo,
        accion,
        id_nivel,
        id_gerencia,
        id_auditor,
        estatus,
        id_informe,
        id_gerencia_encargada,
      } = req.body;
      detalle = detalle.trim();
      fecha_compromiso = new Date(fecha_compromiso);
      id_riesgo = parseInt(id_riesgo);
      id_nivel = parseInt(id_nivel);

      await Hallazgo.create({
        hallazgo_reportado: detalle,
        recomendacion: recomendacion,
        estatus_Plan_Accion: estatus,
        id_informe_auditoria: id_informe,
        id_auditor_responsable: id_auditor,
        id_nivel_riesgo: id_nivel,
        id_riesgo_asociado: id_riesgo,
        id_gerencia: id_gerencia,
        id_gerencia_encargada: id_gerencia_encargada,
        accion_correctiva: accion,
        created_year: year,
      });
      res
        .status(201)
        .json({ text: "El hallazgo fue creado satisfactoriamente" });
    } catch (error) {
      console.error(`Error creating hallazgo: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async updateHallazgo(req: Request, res: Response): Promise<void> {
    try {
      let {
        id_hallazgo,
        hallazgo_reportado,
        fecha_compromiso,
        fecha_cierre,
        accion_correctiva,
        cerrado,
        estatus_Plan_Accion,
        recomen,
        comentario,
        fecha_comentario,
        id_auditor_responsable,
      } = req.body;
      await Hallazgo.update(
        {
          hallazgo_reportado: hallazgo_reportado,
          recomendacion: recomen,
          fecha_compromiso: fecha_compromiso,
          fecha_cierre: fecha_cierre,
          estatus_Plan_Accion: estatus_Plan_Accion,
          accion_correctiva: accion_correctiva,
          cerrado: cerrado,
        },
        {
          where: {
            id_hallazgo: id_hallazgo,
          },
        }
      );
      await HallazgoSeguimiento.create({
        comentario: comentario,
        fecha_comentario: fecha_comentario,
        id_auditor_responsable: id_auditor_responsable,
        id_hallazgo: id_hallazgo,
      });
      res.status(201).json({ text: "Hallazgo creado correctamente" });
    } catch (error) {
      console.error(`Error creating hallazgo: ${error}`);
      res.status(500).json({
        message: `${error}`,
      });
    }
  }

  public async aperturarHallazgo(req: Request, res: Response): Promise<void> {
    try {
      let { id_hallazgo, status, fecha_cierre, cerrado } = req.body;
      console.log(req.body);
      await Hallazgo.update(
        {
          estatus_Plan_Accion: status,
          fecha_cierre: null,
          cerrado: cerrado,
        },
        {
          where: {
            id_hallazgo: id_hallazgo,
          },
        }
      );
      res.status(201).json({ text: "Hallazgo Aperturado" });
    } catch (error) {
      console.error(`Error creating hallazgo: ${error}`);
      res.status(500).json({
        message: `${error}`,
      });
    }
  }
  public async AprobarHallazgo(req: Request, res: Response): Promise<void> {
    try {
      let { id_hallazgo, aprobar } = req.body;
      const state = aprobar ? 1 : 0;

      await Hallazgo.update(
        {
          aprobado: state,
        },
        {
          where: {
            id_hallazgo: id_hallazgo,
          },
        }
      );
      res.status(201).json({ text: "Hallazgo Actualizado correctamente" });
    } catch (error) {
      console.error(`Error creating hallazgo: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async getComent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const comentarios = await HallazgoSeguimiento.findAll({
        where: {
          id_hallazgo: id,
        },
      });
      const auditor = await ExtractEmpleadoComentr();
      const comentsData = await JoinComent(comentarios, auditor);
      if (comentarios.length === 0) {
        res
          .status(204)
          .json({ message: "Comentarios del hallazgo no encontrados" });
      } else {
        res.status(200).json(comentsData);
      }
    } catch (error) {
      res.status(500).json({
        message: `${error}`,
      });
    }
  }
  public async get_hallazgoOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const hallazgos = await ExtracOneHllz(id);
      const gerencias = await ExtracGrc();
      let auditor = await ExtractEmpleado();
      const hallazgoData = await Join(hallazgos, gerencias, auditor);
      if (hallazgoData.length === 0) {
        res.status(204).json({ message: "No hay VPEs" });
      } else {
        res.status(200).json(hallazgoData[0]);
      }
    } catch (error) {
      console.error(`Error fetching VPEs: ${error}`);
      res.status(500).json({ message: `Error fetching VPEs: ${error}` });
    }
  }
  public async get_hallazgo(req: Request, res: Response): Promise<void> {
    try {
      const prevpagina: number = parseInt(req.params.pagina);
      let pagina: number = prevpagina === 0 ? 1 : prevpagina;
      const cantidad: number = 7;
      const yearData: number | string = req.params.yearInf;
      let countData: any = 0;
      let count: number = await Hallazgo.count({
        where: {
          created_year: yearData, // or replace with your desired year
        },
      });
      countData =
        count % cantidad === 0
          ? Math.trunc(count / cantidad)
          : Math.trunc(count / cantidad) + 1;
      pagina = pagina > countData ? (pagina = 1) : pagina;
      const gerencias = await ExtracGrc();
      const hallazgos = await ExtracHllz(pagina, yearData);
      const auditor = await ExtractEmpleado();
      const hallazgosData = await Join(hallazgos, gerencias, auditor);
      const total_paginas = countData == null ? 0 : countData;
      const hallazgo = {
        data: hallazgosData,
        pagina: pagina,
        total_paginas: total_paginas,
      };
      if (count === 0) {
        res
          .status(404)
          .json({ message: "El hallazgo solicitado no fue  encontrado" });
      } else {
        res.status(200).json(hallazgo);
      }
    } catch (error) {
      console.error(`Error fetching VPEs: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }

  public async get_hallazgo_filter_estatus(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      let pagina = parseInt(req.params.pagina);
      let estatus: string = req.params.estatus;
      let message: string = "Data";
      let yearInf: number | string = req.params.yearInf;
      const cantidad: number = 7;
      estatus =
        estatus != "Cerrado" ? (estatus = estatus + "%") : (estatus = estatus);
      let countOptions: any = {};
      if (countOptions == "Seleccion%") {
        countOptions = {
          where: {
            estatus_Plan_Accion: estatus,
            created_year: yearInf,
          },
        };
      } else {
        countOptions = {
          where: {
            cerrado: 0,
            created_year: yearInf,
          },
        };
      }

      let auditor = await ExtractEmpleado();
      let count: any = await Hallazgo.count(countOptions);
      const countData =
        count % cantidad === 0
          ? Math.trunc(count / cantidad)
          : Math.trunc(count / cantidad) + 1;
      pagina = pagina > countData ? (pagina = 1) : pagina;
      const gerencias = await ExtracGrc();
      let hallazgos: any = [];
      hallazgos = await ExtracHllz_Estatus(estatus, pagina, yearInf);
      if (count === 0) {
        count = await Hallazgo.count();
        hallazgos = await ExtracHllz(pagina, yearInf);
        message = "No hemos encontrado ";
      } else {
        message = "Data";
      }
      const hallazgosData = await Join(hallazgos, gerencias, auditor);
      const hallazgo = {
        data: hallazgosData,
        pagina: pagina,
        total_paginas: countData,
        message: message,
      };
      if (count === 0) {
        res.status(404).json({
          message: "No se encontraron hallazgos",
        });
      } else {
        res.status(200).json(hallazgo);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "Se ha producido un error en el servidor .Contactar con el administrador",
        error,
      });
    }
  }
  public async get_hallazgo_filter_grcsAud(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const prevpagina: number = parseInt(req.params.pagina);
      let pagina = prevpagina === 0 ? 1 : prevpagina;
      let Grcs: string | number = req.params.grcs;
      let yearHllz: string | number = req.params.yearInf;
      let yearData: number = 0;
      let message: string = "Data";
      Grcs = parseInt(Grcs);
      let countOptions: any = {
        where: { id_gerencia_encargada: Grcs, created_year: yearHllz },
      };
      let count: any = await Hallazgo.count(countOptions);
      const cantidad: number = 7;
      let countData: any = 0;
      countData =
        count % cantidad === 0
          ? Math.trunc(count / cantidad)
          : Math.trunc(count / cantidad) + 1;
      pagina = pagina > countData ? (pagina = 1) : pagina;
      const gerencias = await ExtracGrc();
      let hallazgos: any = [];
      hallazgos = await ExtracHllz_GrcAud(Grcs, pagina, yearHllz);
      if (hallazgos.length === 0) {
        hallazgos = await ExtracHllz(pagina, yearData);
        message = "No hemos encontrado ";
      } else {
        message = "Data";
      }
      let auditor = await ExtractEmpleado();
      const hallazgosData = await Join(hallazgos, gerencias, auditor);
      const hallazgo = {
        data: hallazgosData,
        pagina: pagina,
        total_paginas: countData,
        cantidad: count,
        message: message,
      };
      if (hallazgos.length === 0) {
        res.status(204).json({
          message: "No se encontraron hallazgos",
        });
      } else {
        res.status(200).json(hallazgo);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      res.status(500).json({
        message:
          "Se ha producido un error en el servidor .Contactar con el administrador",
      });
    }
  }

  public async get_hallazgo_filter(req: Request, res: Response): Promise<void> {
    try {
      const id_informe = req.params.id;
      const hallazgo = await Hallazgo.findAll({
        where: {
          id_informe_auditoria: id_informe,
        },
        include: [
          {
            model: InformeAuditoria,
            attributes: ["nombre_informe", "cod_informe", "trimestre"],
          },
          {
            model: NvlRiesgoModel,
            attributes: ["id_nivel_riesgo", "nombre_nivel_riesgo"],
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
      });
      const gerencias = await ExtracGrc();
      let auditor = await ExtractEmpleado();
      const hallazgosData = await Join(hallazgo, gerencias, auditor);
      if (hallazgo.length === 0) {
        res.status(404).json({ message: "No hay hallazgos" });
      } else {
        res.status(200).json(hallazgosData);
      }
    } catch (error) {
      console.error(`Error fetching hallazgos: ${error}`);
      res.status(500).json({
        message: `El servidor  fallado no fueron encontrados los  hallazgos: ${error}`,
      });
    }
  }
  async delete_hallazgoOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await HallazgoSeguimiento.destroy({
        where: { id_hallazgo: id },
      });
      await Hallazgo.destroy({
        where: { id_hallazgo: id },
      });
      res.status(204).json({ message: "Hallazgo Eliminado Correctamente" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async getReporteVpe(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vpes: any = await extractVpe(id);
      let vps: any = [];
      let hallazgosUnificadosreport: any = [];
      let idGrcJoin: any = [];
      let idvpsJoin: any = [];
      const idsGerencia = [];
      const idsVps = [];
      for (let vpe of vpes) {
        vps = await extractVp(vpe.id_vpe);
        idvpsJoin.push({
          vps,
        });
      }
      for (const Vpid of idvpsJoin) {
        const vicepresidencias = Vpid.vps;
        for (const vicepresidencia of vicepresidencias) {
          idsVps.push(vicepresidencia.id_vp);
        }
      }
      for (let idsVp of idsVps) {
        const idGrc = await ExtractsAllGerencia(idsVp);
        idGrcJoin.push({
          idGrc,
        });
      }
      for (const gerencia of idGrcJoin) {
        const hallazgos = gerencia.idGrc;
        for (const hallazgo of hallazgos) {
          idsGerencia.push(hallazgo.id_gerencia);
        }
      }
      for (const idGerencia of idsGerencia) {
        const hallazgosF = await reportGerencia(idGerencia);
        if (hallazgosF.length > 0) {
          hallazgosUnificadosreport.push({
            hallazgosF,
          });
        }
      }
      if (hallazgosUnificadosreport.length == 0) {
        res.status(404).send({ message: "No se encontraron resultados" });
      } else {
        const nuevoArray = [];
        for (let i = 0; i < hallazgosUnificadosreport.length; i++) {
          const objeto = hallazgosUnificadosreport[i].hallazgosF;
          // ... procesar objeto
          nuevoArray.push(objeto);
        }
        const hallazgosUnificados2 = [];
        for (const hallazgoActual of nuevoArray) {
          for (const hallazgo of hallazgoActual) {
            hallazgosUnificados2.push(hallazgo);
          }
        }
        const gerencias = await ExtracGrc();
        let auditor = await ExtractEmpleado();
        const hallazgosData = await Join(
          hallazgosUnificados2,
          gerencias,
          auditor
        );
        res.status(200).json(hallazgosData);
      }
    } catch (error) {
      console.error(`Ocurrio un error al generar el reporte ${error}`);
      res
        .status(500)
        .json({ message: `Ocurrio un error al generar el reporte: ${error}` });
    }
  }

  public async getReporteVp(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vps: any = await extractVp(id);
      const vpsData = {
        vps: vps,
        countvp: vps.length,
      };
      let hallazgosUnificadosreport: any = [];
      let idGrcJoin: any = [];
      const idsGerencia = [];
      for (let vp of vps) {
        const idGrc = await ExtractsAllGerencia(vp.id_vp);
        idGrcJoin.push({
          idGrc,
        });
      }
      for (const gerencia of idGrcJoin) {
        const hallazgos = gerencia.idGrc;
        for (const hallazgo of hallazgos) {
          idsGerencia.push(hallazgo.id_gerencia);
        }
      }
      for (const idGerencia of idsGerencia) {
        const hallazgosF = await reportGerencia(idGerencia);
        if (hallazgosF) {
          if (hallazgosF.length > 0) {
            hallazgosUnificadosreport.push({
              hallazgosF,
            });
          }
        }
      }
      if (hallazgosUnificadosreport.length === 0) {
        res.status(404).json({
          message:
            "No fue posible encontrar hallazgo para esta VP intenta con otra",
        });
      } else {
        const gerencias = await ExtracGrc();
        let auditor = await ExtractEmpleado();
        const hallazgoData = await Join(
          hallazgosUnificadosreport[0].hallazgosF,
          gerencias,
          auditor
        );
        res.status(200).json(hallazgoData);
      }
    } catch (error) {
      console.error(`Ocurrio un error al generar el reporte ${error}`);
      res
        .status(500)
        .json({ message: `Ocurrio un error al generar el reporte: ${error}` });
    }
  }
  public async getReporteGerencia(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const hallazgos = await reportGerencia(id);
      const gerencias = await ExtracGrc();
      let auditor = await ExtractEmpleado();
      const hallazgoData = await Join(hallazgos, gerencias, auditor);
      if (hallazgos.length === 0) {
        res.status(404).json({ message: "No hay hallazgos" });
      } else {
        res.status(200).json(hallazgoData);
      }
    } catch (error) {
      console.error(`Error fetching VPEs: ${error}`);
      res.status(500).json({ message: `Error en el servidor: ${error}` });
    }
  }
  public async get_hallazgoAll(req: Request, res: Response): Promise<void> {
    try {
      let pagina: number = parseInt(req.params.pagina);
      const cantidad: number = 7;
      const yearData: number | string = req.params.yearInf;

      let countData: any = 0;

      pagina = pagina > countData ? (pagina = 1) : pagina;
      const gerencias = await ExtracGrc();
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

        order: [[Sequelize.col("fecha_creacion"), "desc"]],
      });
      const auditor = await ExtractEmpleado();
      const hallazgosData = await Join(hallazgos, gerencias, auditor);
      const total_paginas = countData == null ? 0 : countData;
      console.log(hallazgosData);
      if (hallazgos.length === 0) {
        res
          .status(404)
          .json({ message: "El hallazgo solicitado no fue  encontrado" });
      } else {
        res.status(200).json(hallazgosData);
      }
    } catch (error) {
      console.error(`Error fetching VPEs: ${error}`);
      res.status(500).json({
        message:
          "Se ha producido un error en el servidor .Contactar con el administrador",
      });
    }
  }
}

export const hallazgoController = new HallazgoController();
