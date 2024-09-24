import { Request, Response } from "express";
import TipoAuditoria from "../Model/TipoAuditoriaModel";
import InformeAuditoria from "../Model/InformeAuditoria";
import { generateUniqueCode } from "../utils/utils";
import Hallazgo from "../Model/HallazgoModel";
import { Sequelize } from "sequelize";
import HallazgoSeguimiento from "../Model/HallazgoSeguimiento";

export class InformeAudController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      let message: string = "";
      let countData: number = 0;
      let year: any = req.params.year;
      let count: any = await InformeAuditoria.count({
        where: {
          created_year: year,
        },
      });
      let yearData: number = 0;

      const pagina: any = parseInt(req.params.pagina);
      const cantidad: number = 11;
      if (count == 0) {
        yearData = 2024;
        message = "No fueron encontrados Informes en este año ";
        countData =
          (await count) % cantidad === 0
            ? Math.trunc(count / cantidad)
            : Math.trunc(count / cantidad) + 1;
      } else {
        yearData = year;
        message = "Informes Encontrados ";
        countData =
          (await count) % cantidad === 0
            ? Math.trunc(count / cantidad)
            : Math.trunc(count / cantidad) + 1;
      }
      const Informes = await InformeAuditoria.findAll({
        attributes: [
          "id_informe_auditoria",
          "cod_informe",
          "nombre_informe",
          "trimestre",
          "id_gerencia_encargada",
          "fecha_creacion",
          "created_year",
        ],
        include: [
          {
            model: TipoAuditoria,
            attributes: ["nombre_tipo_auditoria", "cod_tipo_auditoria"],
          },
        ],
        where: {
          created_year: yearData,
        },
        limit: cantidad,
        offset: (pagina - 1) * cantidad,
        order: [[Sequelize.col("id_informe_auditoria"), "desc"]],
      });
      const informes = {
        data: Informes,
        pagina: pagina,
        total_paginas: countData,
        message: message,
      };
      res.status(200).json(informes);
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async getOneInforme(req: Request, res: Response): Promise<void> {
    try {
      const { cod } = req.params;
      const informe = await InformeAuditoria.findOne({
        where: {
          cod_informe: cod,
        },
      });
      if (!informe) {
        res.status(404).json({ message: "Codigo Informe no encontrado" });
      } else {
        res.status(200).json(informe);
      }
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        code,
        nombre_informe,
        select_one_tipoGrc,
        timestre,
        fk_tipoAud,
        currentYear,
      } = req.body;
      const uniqueCode = await generateUniqueCode(code);
      const grc = select_one_tipoGrc == "GAOF" ? 2 : 1;
      await InformeAuditoria.create({
        id_gerencia_encargada: grc,
        created_year: currentYear,
        nombre_informe,
        cod_informe: uniqueCode,
        trimestre: timestre,
        id_tipo_auditoria: fk_tipoAud,
      });
      res.status(201).json({ text: "Informe creado satisfactoriamente" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor . Contactar con el administrador`,
      });
    }
  }

  public async updateInforme(req: Request, res: Response): Promise<void> {
    try {
      let { id_informe_auditoria, nombre_informe } = req.body;
      await InformeAuditoria.update(
        {
          nombre_informe,
        },
        {
          where: {
            id_informe_auditoria: id_informe_auditoria,
          },
        }
      );
      res.status(201).json({ text: "Informe Actualizado" });
    } catch (error) {
      console.error(`Error creating hallazgo: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
  }
  public async deleteOneInforme(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const hallazgos: any = await Hallazgo.findAll({
        attributes: ["id_hallazgo"],
        where: { id_informe_auditoria: id },
      });
      for (const hallazgo of hallazgos) {
        await HallazgoSeguimiento.destroy({
          where: { id_hallazgo: hallazgo.dataValues.id_hallazgo },
        });
      }
      await Hallazgo.destroy({
        where: { id_informe_auditoria: id },
      });
      await InformeAuditoria.destroy({
        where: {
          id_informe_auditoria: id,
        },
      });
      res.status(204).json({ message: "Informe borrado exitosamente" });
    } catch (error) {
      res.status(500).json({
        message: `Se ha producido un error en el servidor contactate con el administrador  ${error}`,
      });
    }
  }
}
export const informeAudController = new InformeAudController();
