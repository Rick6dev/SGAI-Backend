import { Response, Request } from "express";
import IntraSupervisor from "../Model/SupervisorModel";
import {
  ExtracSup,
  ExtracSupOneGAOF,
  ExtracSupOneGAT,
  ExtracSupVp,
} from "../utils/extractSupervisor";
import {
  ExtractAuditor,
  ExtractAuditorVP,
  ExtractUsuario,
  ExtractUsuarioAuditor,
  formatEmail,
} from "../utils/extractAuditor";
import EmpleadosModel from "../Model/EmpleadoModel";
import {
  RolAud,
  RolGr,
  RolVP,
  asignarAreaTrabajoAuditor,
  asignarAreaTrabajoGrc,
} from "../utils/asignacionRol";
import * as jwt from "jsonwebtoken";
import keys from "../keys";
import { configLdap } from "../config/activedirectory";
import ActiveDirectory from "activedirectory2";
import Auditor from "../Model/AuditModel";
import { determineUserAccess } from "../utils/determineUserAccess";
import Rol from "../Model/RolModel";

class LoginController {
  public async loginValidate(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.body;
      let UserAud: any = {
        nombre: "",
        apellido: "",
      };
      let mail = username;
      let noUser = false;
      mail = formatEmail(mail);
      const nombre = mail.split(".")[0];
      const apellido = mail.split(".")[1].split("@")[0];
      let countOptions: any = {
        where: { mail: mail },
      };
      let count2: any = await EmpleadosModel.count(countOptions);
      if (count2 === 0) {
        noUser = true;
        res.status(203).json({
          noAccess: noUser,
          message: "El usuario ingresado no se encuentra en la bases de datos",
        });
      }else{
        let userF: any = await ExtractUsuario(mail);
        const { rol, user, areaTrabajo, noUser } = await determineUserAccess(
          username
        );

        const role: any = await Rol.findOne({
          where: {
            id_rol: rol,
          },
        });
        if (noUser) {
          res.status(203).json({
            noAccess: noUser,
            message: "No tienes los permisos  para acceder",
          });
        } else {
          let count: number = await Auditor.count({
            where: {
              mail: mail,
            },
          });
          if (count == 0) {
            await Auditor.create({
              nombre: nombre,
              apellido: apellido,
              mail: mail,
              ci_empleado:user[0].ci_empleado

            });
          }
          UserAud = await ExtractUsuarioAuditor(mail);
          console.log(UserAud);
          const token = jwt.sign(
            {
              userId: UserAud[0].id_auditor_responsable,
              userNombre: `${UserAud[0].nombre} ${UserAud[0].apellido} `,
              message: ` Bienvenido ${role.rol} ${UserAud[0].nombre} ${UserAud[0].apellido}, tu area es ${areaTrabajo} `,
              role: role.id_rol,
              namerole: role.rol,
              areaTrabajo: areaTrabajo,
              ci_empleado:UserAud[0].ci_empleado,
            },
            keys.adminData.SECRET_TOKEN,
            { expiresIn: "1h" }
          );
          res.status(200).json(token);
        }
      }
    } catch (error) {
      res.status(500).json({
        noAccess: true,
        message: `Se ha producido un error inesperado . Por favor, póngase en contacto con el administrador del sitio. ${error}`,
      });
    }
  }
  public async getEmpleado(req: Request, res: Response): Promise<void> {
    try {
      const supervisor: any = await ExtracSup();
      if (supervisor.length === 0) {
        res.status(204).json({ message: "No existe este supervisor" });
      } else {
        res.status(200).json(supervisor);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error  en el servidor  al solicitar  un usuario ` });
    }
  }
}

export const loginController = new LoginController();
