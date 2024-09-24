import Vacacion from "../Model/VacacionModel";
import { Request, Response } from "express";
import { auditSequelize, sequelize } from "../database";
import Auditor from "../Model/AuditModel";
import { Op, col, fn } from "sequelize";
import IntraVacaciones from "../Model/IntraVacationModel";
import EmpleadosModel from "../Model/EmpleadoModel";
import { crearVacacion, deleteVacacion } from "../utils/crearVacation";
import c from "config";
class VacationController {
    public async getVacation(req: Request, res: Response): Promise<void> {
      try {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        const vacaciones = await Vacacion.findAll({
          // where: { status: true },
          attributes: [
            [fn('DATE_FORMAT', sequelize.col('fecha_inicio'), '%Y-%m-%d'), 'fecha_inicio'],
            [fn('DATE_FORMAT', sequelize.col('fecha_reingreso'), '%Y-%m-%d'), 'fecha_reingreso'],
            [fn('DATE_FORMAT', sequelize.col('fecha_culminacion'), '%Y-%m-%d'), 'fecha_culminacion'],
            'id_vacacion','year','id_auditor_responsable'
          ],
          where: {year:añoActual},
          include:[
            {
              model:Auditor
            }
          ]
        });
  
        if (vacaciones.length === 0) {
          res
            .status(204)
            .json({ message: "Vacaciones " });
        } else {
          res.status(200).json(vacaciones);
        }
      } catch (error) {
        res.status(500).json({
          message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
        });
      }
    }

    public async getOneVacation(req: Request, res: Response): Promise<void> {
      try {

        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        console.log(añoActual);
        console.log(req.params)
        const id=req.params.id
        const vacaciones = await Vacacion.findAll({
          attributes: [
            [fn('DATE_FORMAT', sequelize.col('fecha_inicio'), '%Y-%m-%d'), 'fecha_inicio'],
            [fn('DATE_FORMAT', sequelize.col('fecha_reingreso'), '%Y-%m-%d'), 'fecha_reingreso'],
            [fn('DATE_FORMAT', sequelize.col('fecha_culminacion'), '%Y-%m-%d'), 'fecha_culminacion'],
            'id_vacacion','year','id_auditor_responsable'
          ],
          where: { id_auditor_responsable:id ,year:añoActual},
          include:[
            {
              model:Auditor
            }
          ]
        });
  
        if (vacaciones.length === 0) {
          res
            .status(204)
            .json({ message: "Vacaciones no encontradas " });
        } else {
          res.status(200).json(vacaciones);
        }
      } catch (error) {
        res.status(500).json({
          message: `Se ha producido un error en el servidor .Contactar con el administrador `,
        });
      }
    }

    public async getIntraVacation(req: Request, res: Response): Promise<void> {
      try {
        console.log(req.params)
        const ci_empleado=req.params.ci_empleado
        const id=req.params.id
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        const intraVacaciones = await IntraVacaciones.findAll({
          where: { cedula:ci_empleado    ,
            fecha_desde: {
            [Op.like]: `${añoActual}%` 
          }},
          include:[
            {
              model:EmpleadosModel
            }
          ]
        });

        const vacaciones = await Vacacion.findAll({
          attributes: [
            [fn('DATE_FORMAT', sequelize.col('fecha_inicio'), '%Y-%m-%d'), 'fecha_inicio'],
            [fn('DATE_FORMAT', sequelize.col('fecha_reingreso'), '%Y-%m-%d'), 'fecha_reingreso'],
            [fn('DATE_FORMAT', sequelize.col('fecha_culminacion'), '%Y-%m-%d'), 'fecha_culminacion'],
            'id_vacacion','year','id_auditor_responsable'
          ],
          where: { id_auditor_responsable:id ,year:añoActual},
          include:[
            {
              model:Auditor
            }]
        })
        if (intraVacaciones.length === 0) {
          vacaciones.forEach((vacacion:any)=>{
            deleteVacacion(vacacion);
          })
          res
            .status(204)
            .json({ message: "Vacaciones no encontradas " });
        } else {
          if(vacaciones.length==0){
            intraVacaciones.forEach((solicitud:any) => {
              crearVacacion(solicitud,id)
              });
          }else{
            vacaciones.forEach((vacacion:any)=>{
              deleteVacacion(vacacion);
            })

            intraVacaciones.forEach((solicitud:any) => {
              crearVacacion(solicitud,id)
              });
          }
          res.status(200).json(intraVacaciones);
        }
      } catch (error) {
        res.status(500).json({
          message: `Se ha producido un error en el servidor .Contactar con el administrador `,
        });
      }
    }

    public async countVacation(req: Request, res: Response): Promise<void> {
      try {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        console.log(añoActual);
        const id= req.params.id
        const existeRiesgo = await Vacacion.count({
         
          where: {
            id_auditor_responsable:id,
            year: añoActual,
          },
        });
        if (existeRiesgo > 1) {
          res.status(200).json({
            message: "El auditor alcanzo el limite de periodos de Vacaciones ",
             flagVacation:true 
             ,numeroVacaciones:existeRiesgo
          });
        } else {
          res
            .status(200)
            .json({ flagVacation:false,numeroVacaciones:existeRiesgo });
        }
      } catch (error) {
        res.status(500).json({
          message: `Se ha producido un error en el servidor .Contactar con el administrador `,
        });
      }
    }



    public async getFilterVacation(req: Request, res: Response): Promise<void> {
   try{
          let vacacionesFiltradas:any=[]
          const uniqueAuditorIDs = new Set();
          const fInicio=req.params.fechaInicio
          const [year,month,day] :any=fInicio.split("-");
          const fechaNewInicio =`${year}-${month}-${day-1}`;
          const fculminacion=req.params.fechaCulminacion
          console.log(fInicio)
          const fechaActual = new Date();
          const añoActual = fechaActual.getFullYear();

    const vacaciones = await Vacacion.findAll({
      include:[
        {
          model:Auditor
        }
      ],
      where: {
        fecha_inicio: {
          [Op.notBetween]: [fechaNewInicio, fculminacion]
        },
        fecha_culminacion: {
          [Op.notBetween]: [fechaNewInicio, fculminacion]
        },
        year:añoActual
      }
    });
    const auditorVacaciones = await Vacacion.findAll({
      where: {
        fecha_inicio: {
          [Op.between]: [fechaNewInicio, fculminacion]
        },
        year:añoActual
      }
    });
        if (vacaciones.length === 0) {
          res
            .status(204)
            .json({ message: "Vacaciones no encontradas " });
        } else {
            if(auditorVacaciones.length===0){
              vacacionesFiltradas=vacaciones
            }else{
              auditorVacaciones.forEach((solicitud:any) => {
                vacacionesFiltradas = vacaciones.filter(function(vacacion:any) {
                  return vacacion.id_auditor_responsable !== solicitud.id_auditor_responsable;
                });
                });
          }
      // Filtrar la matriz de datos y agregar IDs de auditor únicos al conjunto
        const filteredData = vacacionesFiltradas.filter((item:any) => {
          if (!uniqueAuditorIDs.has(item.id_auditor_responsable)) {
            uniqueAuditorIDs.add(item.id_auditor_responsable);
            return true;
          }
          return false;
        });
          res.status(200).json(filteredData);
        }
      } catch (error) {
        res.status(500).json({
          message: `Se ha producido un error en el servidor .Contactar con el administrador `,
        });
      }
    }
    public async create(req:Request,res:Response):Promise<void>{
      try{
        let {
          id_vacacion,fecha_inicio,fecha_reintegro,fecha_culminacion,user_id
        ,year} = req.body;
        await Vacacion.create({
          id_vacacion:id_vacacion ,
          fecha_inicio:fecha_inicio ,
          fecha_reingreso:fecha_reintegro ,
          fecha_culminacion:fecha_culminacion ,
          id_auditor_responsable:user_id ,
          year:year
        })
        res.status(201).json({text:"Registro de  vaciones  creadas"})

      }catch (error) {
      console.error(`Error creating hallazgo: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
    }

    public async update(req: Request, res: Response): Promise<void> {
      try {
        let {
          id_vacacion,fecha_inicio,fecha_reintegro,fecha_culminacion,user_id
        ,year} = req.body;
        await Vacacion.update(
          {
            fecha_inicio:fecha_inicio ,
            fecha_reingreso:fecha_reintegro ,
            fecha_culminacion:fecha_culminacion ,
            id_auditor_responsable:user_id ,
            year:year
          },
          {
            where: {
              id_vacacion:id_vacacion
            },
          }
        );
        res.status(201).json({ text: "Vacacion aprobada correctamente" });
      } catch (error) {
        console.error(`Error creating hallazgo: ${error}`);
        res.status(500).json({
          message: `${error}`,
        });
      }
    }



    public async delete(req:Request,res:Response):Promise<void>{
      try{
        const { id } = req.params;
        await Vacacion.destroy({
          where: { id_vacacion: id },
        });
        res.status(204).json({ message: "Hallazgo Eliminado Correctamente" });

      }catch (error) {
      console.error(`Error creating hallazgo: ${error}`);
      res.status(500).json({
        message: `Se ha producido un error en el servidor .Contactar con el administrador`,
      });
    }
    }
}

export const vacationController = new  VacationController();