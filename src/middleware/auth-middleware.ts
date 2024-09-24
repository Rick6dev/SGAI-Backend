import { JsonWebTokenError } from "jsonwebtoken";
import { Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import keys from "../keys";
import { NextFunction } from "express";
import moment from "moment";
import { DATE } from "sequelize";
import ActiveDirectory from "activedirectory2";
import { configLdap } from "../config/activedirectory";
import { formatEmail } from "../utils/extractAuditor";
import EmpleadosModel from "../Model/EmpleadoModel";

class AuthController {
  public async isAuth(req: Request, res: Response, next: NextFunction) {
    try {
      let tokenStruct: any = {
        payload: {
          userId: 0,
          userNombre: "",
          message: " ",
          role: 0,
          areaTrabajo: "",
          iat: 0,
          exp: 0,
        },
      };
      const secret: string = keys.adminData.SECRET_TOKEN;
      const options: jwt.DecodeOptions = { complete: true };
      const token = req.headers?.authorization?.split(" ")[1];

      if (!token) {
        return res
          .status(403)
          .json({ message: "No se ha proporcionado un token de acceso" });
      }
      tokenStruct = jwt.decode(token, options);

      const tokenExp =
        tokenStruct.payload.exp - Math.floor(new Date().getTime() / 1000);
      if (tokenExp < 0) {
        return res.status(403).json({ message: "El token ha caducado" });
      }
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ message: error });
      } else {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
      }
    }
  }

  public async UserDirectory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    const mail = formatEmail(username);
    let noUser = false;
    var ad = new ActiveDirectory(configLdap);
    let countOptions: any = {
      where: { mail: mail },
    };
    try {
      let count: any = await EmpleadosModel.count(countOptions);
      if (count === 0) {
        noUser = true;
        res.status(203).json({
          noAccess: noUser,
          message: "El usuario  ingresado no esta en la  bases de de datos",
        });
      } else {
        ad.authenticate(mail, password, function (err: any, auth: any) {
          if (err) {
            console.log(err);
            return res.status(403).send({
              message:
                "Los datos ingresados, no son correctos. Intente nuevamente.",
            });
          }

          if (auth) {
            next();
          } else {
            return res.status(400).send({
              message:
                "Intente nuevamente, si persiste el error, contacte al administrador del sistema.",
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:
          "Intente nuevamente, si persiste el error, contacte al administrador del sistema.",
      });
    }
  }
}

export const authController = new AuthController();
