import { Request, Response } from "express";
import { auditSequelize, sequelize } from "../database";
import VpeModel from "../Model/VPEModel";
import VpModel from "../Model/VPModel";
import GrcModel from "../Model/GrcModel";
import RiesgoAsociado from "../Model/NvlRiesgoModel";
import NvlRiesgoModel from "../Model/NvlRiesgoModel";
import RsgModel from "../Model/RsgModel";
import TipoAuditoria from "../Model/TipoAuditoriaModel";
import EmpleadosModel from "../Model/EmpleadoModel";
import { ExtractEmpleado } from "../utils/extractEmpleados";
import GerenciaAuditoria from "../Model/GrcAudit";
export class AdminController {
  public async get_VPE(req: Request, res: Response): Promise<void> {
    try {
      const vpes = await VpeModel.findAll({
        where: { status: true },
        attributes: ["id_vpe", "nombre_vpe"],
      });

      if (vpes.length === 0) {
        res
          .status(204)
          .json({ message: "Vicepresidencias Ejecutivas no disponibles" });
      } else {
        res.status(200).json(vpes);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador `,
      });
    }
  }

  public async get_VP(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vps = await VpModel.findAll({
        where: {
          status: 1,
          id_vpe: id,
        },
      });
      if (vps.length === 0) {
        res
          .status(204)
          .json({ message: "Vicepresidencias Ejecutivas no disponibles" });
      } else {
        res.status(200).json(vps);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async get_Gerencia(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gerencias = await GrcModel.findAll({
        where: {
          id_vp: id,
          status: 1,
        },
      });
      if (gerencias.length === 0) {
        res.status(404).json({ message: "Gerencias no encontradas" });
      } else {
        res.status(200).json(gerencias);
      }
    } catch (error) {
      console.error(`Error fetching gerencias: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async getRiesgoAsociado(req: Request, res: Response): Promise<void> {
    try {
      const riesgoAsociado = await RsgModel.findAll({
        attributes: ["id_riesgo_asociado", "nombre_riesgo_asociado"],
      });
      if (riesgoAsociado.length === 0) {
        res.status(204).json({ message: "No hay niveles de riesgo" });
      } else {
        res.status(200).json(riesgoAsociado);
      }
    } catch (error) {
      console.error(`Error fetching niveles de riesgo: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async getGrcAud(req: Request, res: Response): Promise<void> {
    try {
      const gerenciasAud = await GerenciaAuditoria.findAll({
        attributes: ["id_gerencia_encargada", "gerencia_encargada"],
      });
      if (gerenciasAud.length === 0) {
        res.status(204).json({ message: "Gerencia de Auditoria" });
      } else {
        res.status(200).json(gerenciasAud);
      }
    } catch (error) {
      console.error(`Error Gerencia de Auditoria: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${{
          error,
        }}`,
      });
    }
  }
  public async createRiesgoAsociado(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const nombre = req.body.nombre;
      const existeRiesgo = await RsgModel.count({
        where: {
          nombre_riesgo_asociado: nombre,
        },
      });

      if (existeRiesgo > 0) {
        res
          .status(409)
          .json({ message: "Riesgo asociado ya existe en la  base de datos." });
      } else {
        await RsgModel.create({
          nombre_riesgo_asociado: nombre,
        });
        res
          .status(201)
          .json({ message: "Riesgo asociado creado correctamente " });
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async getNivelRiesgo(req: Request, res: Response): Promise<void> {
    try {
      const nivelRiesgo = await NvlRiesgoModel.findAll({
        attributes: ["id_nivel_riesgo", "nombre_nivel_riesgo"],
      });
      if (nivelRiesgo.length === 0) {
        res.status(204).json({ message: "No hay riesgos asociados" });
      } else {
        res.status(200).json(nivelRiesgo);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async createNivelRiesgo(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.body;

      const existeRiesgo = await NvlRiesgoModel.count({
        where: {
          nombre_nivel_riesgo: nombre,
        },
      });

      if (existeRiesgo > 0) {
        res.status(409).json({
          message: "El nivel de Riesgo  existe en la bases de datos ",
        });
      } else {
        await NvlRiesgoModel.create({
          nombre_nivel_riesgo: nombre,
        });
        res
          .status(201)
          .json({ message: "El nivel de Riesgo fue  creado correctamente " });
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador `,
      });
    }
  }
  public async get_Tipo_Auditoria(req: Request, res: Response): Promise<void> {
    try {
      const tipoAuditoria = await TipoAuditoria.findAll();
      if (tipoAuditoria.length === 0) {
        res
          .status(404)
          .json({ message: "No se encontraron tipos de auditoría" });
      } else {
        res.status(200).json(tipoAuditoria);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async existTipoAuditoria(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, codigo } = req.body;
      const count: any = await TipoAuditoria.findOne({
        where: { cod_tipo_auditoria: codigo },
      });
      if (count) {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(201).json({ message: "La auditoria se puede procesar " });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador ${error}`,
      });
    }
  }
  public async createTipoAuditoria(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, codigo } = req.body;
      const existeNombre = await TipoAuditoria.count({
        where: {
          nombre_tipo_auditoria: nombre,
        },
      });
      const existeCodigo = await TipoAuditoria.count({
        where: {
          cod_tipo_auditoria: codigo,
        },
      });
      if (existeNombre > 0 || existeCodigo > 0) {
        res.status(409).json({
          message:
            "La Tipo de Auditoria o el codigo ya existe en la base de datos.",
        });
      } else {
        await TipoAuditoria.create({
          cod_tipo_auditoria: codigo,
          nombre_tipo_auditoria: nombre,
        });
        res.status(201).json({ message: "Tipo de Auditoria Creada " });
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador `,
      });
    }
  }
  public async get_Auditor(req: Request, res: Response): Promise<void> {
    try {
      const auditor = await ExtractEmpleado();
      if (auditor.length === 0) {
        res.status(404).json({ message: "No se encontraron Auditores" });
      } else {
        res.status(200).json(auditor);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
}

export const adminController = new AdminController();
