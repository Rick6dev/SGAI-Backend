import Vacacion from "../Model/VacacionModel";
import { Request, Response } from "express";
import { auditSequelize, sequelize } from "../database";
import Auditor from "../Model/AuditModel";
import { Op, Sequelize, col, fn } from "sequelize";
import IntraVacaciones from "../Model/IntraVacationModel";
import EmpleadosModel from "../Model/EmpleadoModel";
import { crearVacacion, deleteVacacion } from "../utils/crearVacation";
import c from "config";
import Macroproceso from "../Model/MacroprocesoModel";
import Proceso from "../Model/Proceso";
import TipoProceso from "../Model/TipoProcesosModel";
import Subproceso from "../Model/SubProcesoModel";
import PlanificacionAuditoriaModel from "../Model/PlanificacionModel";
import PlanificacionComentario from "../Model/PlanificacionComentarioModel";
import { determineTiempoEntrega } from "../utils/determinarTiempoEntrefa";
class PlanificacionController {
  public async getMacroproceso(req: Request, res: Response): Promise<void> {
    try {
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const macroprocesos = await Macroproceso.findAll({
        order: [[Sequelize.col("nombre_macroproceso"), "asc"]],
      });
      if (macroprocesos.length === 0) {
        res.status(204).json({ message: "Vacaciones " });
      } else {
        res.status(200).json(macroprocesos);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador `,
      });
    }
  }

  public async getTipoProceso(req: Request, res: Response): Promise<void> {
    try {
      const tipoProceso = await TipoProceso.findAll({});
      if (tipoProceso.length === 0) {
        res.status(204).json({ message: "Vacaciones " });
      } else {
        res.status(200).json(tipoProceso);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador `,
      });
    }
  }

  public async postMacroproceso(req: Request, res: Response): Promise<void> {
    try {
      const { macroproceso } = req.body;
      console.log(req.body);

      const existeNombre = await Macroproceso.count({
        where: {
          nombre_macroproceso: macroproceso,
        },
      });
      if (existeNombre > 0) {
        res.status(409).json({
          message: "El macroproceso ingresado se encuentre registrado.",
        });
      } else {
        await Macroproceso.create({
          nombre_macroproceso: macroproceso,
        });
        res
          .status(201)
          .json({ text: "Macroproceso creado satisfactoriamente" });
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador`,
      });
    }
  }

  public async getProceso(req: Request, res: Response): Promise<void> {
    try {
      const fechaActual = new Date();
      const procesos = await Proceso.findAll({
        include: [
          {
            model: TipoProceso,
          },
          {
            model: Macroproceso,
          },
        ],
      });
      if (procesos.length === 0) {
        res.status(204).json({ message: "Procesos no encontrados" });
      } else {
        res.status(200).json(procesos);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async postProceso(req: Request, res: Response): Promise<void> {
    try {
      const { proceso, id_tipo_proceso, id_macroproceso } = req.body;
      const existeNombre = await Proceso.count({
        where: {
          nombre_proceso: proceso,
        },
      });
      if (existeNombre > 0) {
        res.status(409).json({
          message: "El Proceso ingresado se encuentre registrado.",
        });
      } else {
        await Proceso.create({
          nombre_proceso: proceso,
          id_tipo_proceso: id_tipo_proceso,
          id_macroproceso: id_macroproceso,
        });
        res.status(201).json({ text: "Informe creado satisfactoriamente" });
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
      });
    }
  }

  public async getPlanificacionCalendar(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          attributes: [
            ["id_planificacion_auditoria", "id"],
            "cantidad_subprocesos",
            ["fecha_culminacion", "end"],
            ["fecha_inicio", "start"],
          ],
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
        });
      if (planificacionAuditoria.length === 0) {
        res.status(204).json({ message: "Vacaciones " });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getGroupProceso(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const procesos = await Proceso.findAll({
        include: [
          {
            model: TipoProceso,
          },
          {
            model: Macroproceso,
          },
        ],
        where: {
          id_macroproceso: id, // or replace with your desired year
        },
      });
      if (procesos.length === 0) {
        res.status(204).json({ message: "Procesos no encontrados" });
      } else {
        res.status(200).json(procesos);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async postSubproceso(req: Request, res: Response): Promise<void> {
    try {
      console.log("Hola");
      const { id_macroproceso, id_proceso, subproceso } = req.body;

      const existeNombre = await Subproceso.count({
        where: {
          nombre_subproceso: subproceso,
        },
      });
      if (existeNombre > 0) {
        res.status(409).json({
          message: "El subproceso ingresado se encuentre registrado.",
        });
      } else {
        await Subproceso.create({
          nombre_subproceso: subproceso,
          id_proceso: id_proceso,
        });
        res.status(201).json({ text: "Subproceso creado satisfactoriamente" });
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
      });
    }
  }

  public async getGroupSubProceso(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const subprocesos = await Subproceso.findAll({
        include: [
          {
            model: Proceso,
          },
        ],
        where: {
          id_proceso: id,
        },
      });
      if (subprocesos.length === 0) {
        res.status(204).json({ message: "SubProcesos no encontrados" });
      } else {
        res.status(200).json(subprocesos);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }
  public async postPlanifacion(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const {
        id_gerencia_encargada,
        estado,
        id_auditor_responsable,
        id_auditor_secundario,
        id_auditor_terciario,
        id_macroproceso,
        id_proceso,
        id_subproceso,
        fecha_inicio,
        fecha_culminacion,
        cantidad_subprocesos,
        flagAS400,
        flagSAP,
        flagISTCLEAR,
        flagIST77,
        flagIST73,
        flagNAIGUATA,
        flagDA,
        flagFULL,
        created_year,
        mount_end,
      } = req.body;

      await PlanificacionAuditoriaModel.create({
        id_gerencia_encargada: id_gerencia_encargada,
        id_auditor_responsable: id_auditor_responsable,
        id_auditor_secundario: id_auditor_secundario,
        id_auditor_terciario: id_auditor_terciario,
        id_subproceso: id_subproceso,
        fecha_inicio: fecha_inicio,
        fecha_culminacion: fecha_culminacion,
        cantidad_subprocesos: cantidad_subprocesos,
        entrega: null,
        // fechaInicioProceso:'000-00-00',
        flagAS400: flagAS400,
        flagSAP: flagSAP,
        flagISTCLEAR: flagISTCLEAR,
        flagIST77: flagIST77,
        flagIST73: flagIST73,
        flagNAIGUATA: flagNAIGUATA,
        flagDA: flagDA,
        flagFULL: flagFULL,
        created_year: created_year,
        mount_end: mount_end,
        estado: estado,
      });
      res.status(201).json({ text: "Informe creado satisfactoriamente" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
      });
    }
  }

  public async postPlanifacionComentario(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      console.log(req.body);
      const {
        comentario,
        id_planificacion_auditoria,
        role,
        id_auditor_responsable,
      } = req.body;

      await PlanificacionComentario.create({
        comentario: comentario,
        id_planificacion_auditoria: id_planificacion_auditoria,
        id_auditor_responsable: id_auditor_responsable,
        role: role,
      });
      res.status(201).json({ text: "Comentario registrado" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
      });
    }
  }

  public async updatePlanifacion(req: Request, res: Response): Promise<void> {
    try {
      // const {id_planificacion_auditoria}=req.params;
      const {
        id_planificacion_auditoria,
        id_gerencia_encargada,
        id_auditor_responsable,
        id_auditor_secundario,
        id_auditor_terciario,
        id_macroproceso,
        id_proceso,
        id_subproceso,
        fecha_inicio,
        fecha_culminacion,
        cantidad_subprocesos,
        flagAS400,
        flagSAP,
        flagISTCLEAR,
        flagIST77,
        flagIST73,
        flagNAIGUATA,
        flagDA,
        flagFULL,
        created_year,
        mount_end,
      } = req.body;
      await PlanificacionAuditoriaModel.update(
        {
          id_gerencia_encargada: id_gerencia_encargada,
          id_auditor_responsable: id_auditor_responsable,
          id_auditor_secundario: id_auditor_secundario,
          id_auditor_terciario: id_auditor_terciario,
          id_subproceso: id_subproceso,
          fecha_inicio: fecha_inicio,
          fecha_culminacion: fecha_culminacion,
          cantidad_subprocesos: cantidad_subprocesos,
          flagAS400: flagAS400,
          flagSAP: flagSAP,
          flagISTCLEAR: flagISTCLEAR,
          flagIST77: flagIST77,
          flagIST73: flagIST73,
          flagNAIGUATA: flagNAIGUATA,
          flagDA: flagDA,
          flagFULL: flagFULL,
          created_year: created_year,
          mount_end: mount_end,
        },
        {
          where: {
            id_planificacion_auditoria: id_planificacion_auditoria,
          },
        }
      );
      res
        .status(201)
        .json({ text: "Planificación actualizado satisfactoriamente" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
      });
    }
  }

  public async updatePlanifacionStatus(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      console.log("Enviado", req.body);
      // const {id_planificacion_auditoria}=req.params;
      const {
        id_planificacion_auditoria,
        flagProceso,
        mount_end,
        flagAsignado,
        estado,
        flagDesaprobadoVp,
        flagAprobadoGerente,
        flagAprobadoVp,
        flagCulminado,
        flagDesaprobadoGerente,
        fecha_culminado_auditor,
        fecha_proceso,
        fecha_avalado,
        fecha_aprobado,
        fecha_finalizado,
        entrega,
      } = req.body;

      await PlanificacionAuditoriaModel.update(
        {
          flagAprobadoGerente: flagAprobadoGerente,
          flagAprobadoVp: flagAprobadoVp,
          flagAsignado: flagAsignado,
          flagCulminado: flagCulminado,
          flagDesaprobadoGerente: flagDesaprobadoGerente,
          flagDesaprobadoVp: flagDesaprobadoVp,
          flagProceso: flagProceso,
          fecha_proceso: fecha_proceso,
          fecha_aprobado: fecha_aprobado,
          fecha_culminado_auditor: fecha_culminado_auditor,
          fecha_avalado: fecha_avalado,
          fecha_finalizado: fecha_finalizado,
          estado: estado,
          mount_end: mount_end,
          entrega: entrega,
        },
        {
          where: {
            id_planificacion_auditoria: id_planificacion_auditoria,
          },
        }
      );
      res
        .status(201)
        .json({ text: "Planificación actualizado satisfactoriamente" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
      });
    }
  }

  public async deletePlanifacion(req: Request, res: Response): Promise<void> {
    try {
      const { id_planificacion_auditoria } = req.params;
      await PlanificacionComentario.destroy({
        where: {
          id_planificacion_auditoria: id_planificacion_auditoria,
        },
      });
      await PlanificacionAuditoriaModel.destroy({
        where: {
          id_planificacion_auditoria: id_planificacion_auditoria,
        },
      });
      res.status(201).json({ text: "Informe eliminado satisfactoriamente" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
      });
    }
  }

  public async getPlanificacionComentario(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id_planificacion_auditoria } = req.params;
      const planificacionAuditoria: any = await PlanificacionComentario.findAll(
        {
          include: [{ model: Auditor }],
          where: { id_planificacion_auditoria: id_planificacion_auditoria },
          order: [[Sequelize.col("fechaComentario"), "desc"]],
        }
      );
      if (planificacionAuditoria.length === 0) {
        res.status(204).json({
          message: "No fueron encontrados  comentarios para esta planificación",
        });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }
  public async getAuditores(req: Request, res: Response): Promise<void> {
    try {
      const auditor: any = await Auditor.findAll({
        where: {
          status: 1,
        },
      });
      if (auditor.length === 0) {
        res.status(204).json({ message: "No fueron encontrado Auditores " });
      } else {
        res.status(200).json(auditor);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacion(req: Request, res: Response): Promise<void> {
    try {
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          order: [
            [Sequelize.col("id_gerencia_encargada"), "desc"],
            [Sequelize.col("fecha_inicio"), "desc"],
          ],
        });
      if (planificacionAuditoria.length === 0) {
        res.status(204).json({ message: "Vacaciones " });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionAsignados(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagAsignado: 1,
            id_auditor_responsable: id,
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionProceso(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagProceso: 1,
            id_auditor_responsable: id,
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionCulminado(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagCulminado: 1,
            id_auditor_responsable: id,
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionCulminadoEntregaGerente(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id_area;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagCulminado: 1,
            id_gerencia_encargada: id,

            [Op.and]: [
              { flagAprobadoGerente: { [Op.or]: [0, null] } },
              { flagDesaprobadoGerente: { [Op.or]: [0, null] } },
            ],
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionAprobadoGerente(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id_area = req.params.id_area;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagAprobadoGerente: 1,
            id_gerencia_encargada: id_area,
            flagAprobadoVp: 0,
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionAprobadoGerenteEntregaVp(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id_area = req.params.id_area;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagAprobadoGerente: 1,
            [Op.and]: [
              { flagAprobadoVp: { [Op.or]: [0, null] } },
              { flagDesaprobadoVp: { [Op.or]: [0, null] } },
            ],
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionRechazadoGerente(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id_area = req.params.id_area;
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagDesaprobadoGerente: 1,
            id_gerencia_encargada: id_area,
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionAprobadoVp(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagAprobadoVp: 1,
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getPlanificacionAprobadoVpCondicional(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const fechaActual = new Date();
      // Sumar tres días
      const fechaFutura = new Date(fechaActual);
      fechaFutura.setDate(fechaActual.getDate() + 3);

      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            [Op.and]: [
              { flagAprobadoVp: 1 },
              { fecha_avalado: { [Op.lt]: fechaFutura } },
            ],
          },

          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }
  public async getPlanificacionRechazadoVp(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();
      const planificacionAuditoria: any =
        await PlanificacionAuditoriaModel.findAll({
          include: [
            { model: Auditor, as: "auditorResponsable" },
            { model: Auditor, as: "auditorSecundario" },
            { model: Auditor, as: "auditorTerciario" },
            {
              model: Subproceso,
              include: [
                {
                  model: Proceso,
                  include: [
                    {
                      model: Macroproceso,
                    },
                    { model: TipoProceso },
                  ],
                },
              ],
            },
          ],
          where: {
            flagDesaprobadoVp: 1,
          },
          order: [[Sequelize.col("fecha_inicio"), "desc"]],
        });
      if (planificacionAuditoria.length === 0) {
        res
          .status(204)
          .json({ message: "No encontrados Auditorias Asignadas" });
      } else {
        res.status(200).json(planificacionAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  public async getGroupPlanificacion(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const fechaActual = new Date();
      const añoActual = fechaActual.getFullYear();

      const subresults = await PlanificacionAuditoriaModel.findAll({
        attributes: [
          "mount_end",
          "id_gerencia_encargada",
          [
            Sequelize.fn("SUM", Sequelize.col("cantidad_subprocesos")),
            "total_subprocesos",
          ],
          [
            Sequelize.literal(`(
                  SELECT SUM(cantidad_subprocesos)
                  FROM planificacion_auditoria p
                  WHERE p.mount_end <= \`planificacion_auditoria\`.\`mount_end\`
                    AND p.id_gerencia_encargada = \`planificacion_auditoria\`.\`id_gerencia_encargada\`
                )`),
            "total_subprocesos_acumulado",
          ],
        ],
        group: ["mount_end", "id_gerencia_encargada"],
      });

      const total = await PlanificacionAuditoriaModel.findAll({
        attributes: [
          [
            Sequelize.fn("SUM", Sequelize.col("cantidad_subprocesos")),
            "total_subprocesos",
          ],
          [
            Sequelize.literal(`(
                  SELECT SUM(cantidad_subprocesos)
                  FROM planificacion_auditoria p
                  WHERE p.mount_end <= \`planificacion_auditoria\`.\`mount_end\`
              
                )`),
            "total_subprocesos_acumulado",
          ],
        ],
      });
      const results = {
        total,
        subresults,
      };
      const planificacion = await PlanificacionAuditoriaModel.findAll({
        where: { mount_end: 6 },

        order: [[Sequelize.col("fecha_inicio"), "asc"]],
      });
      if (subresults.length === 0) {
        res.status(204).json({ message: "Vacaciones " });
      } else {
        res.status(200).json(results);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
      });
    }
  }

  // public async postPlanificacion(req: Request, res: Response): Promise<void> {
  //   try {
  //     const planificacion = await PlanificacionAuditoriaModel.findAll({

  //       attributes: [
  //         [Sequelize.fn('EXTRACT', 'fecha_inicio'), 'anio'],
  //         // ... otros campos que deseas incluir
  //       ],
  //       group: ['anio', ],
  //     });
  //     if (planificacion.length === 0) {
  //       res
  //         .status(204)
  //         .json({ message: "Vacaciones " });
  //     } else {
  //       res.status(200).json(planificacion);
  //     }
  //   } catch (error) {
  //     res.status(500).json({
  //       message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
  //     });
  //   }
  // }
}

export const planificacionController = new PlanificacionController();
