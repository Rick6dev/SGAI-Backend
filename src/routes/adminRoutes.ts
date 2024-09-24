import { Router } from "express";

import { adminController } from "../controllers/adminController";
import { authController } from "../middleware/auth-middleware";

class AdminRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post(
      "/riesgoAsociado",
      authController.isAuth,
      adminController.createRiesgoAsociado
    );

    this.router.post(
      "/tipoAud",
      authController.isAuth,
      adminController.createTipoAuditoria
    );

    this.router.get("/", authController.isAuth, adminController.get_VPE);
    this.router.get("/VPE/:id", authController.isAuth, adminController.get_VP);
    this.router.get(
      "/VP/:id",
      authController.isAuth,
      adminController.get_Gerencia
    );
    this.router.get(
      "/tipoAud",
      authController.isAuth,
      adminController.get_Tipo_Auditoria
    );
    this.router.get(
      "/exist",
      authController.isAuth,
      adminController.existTipoAuditoria
    );
    this.router.get(
      "/nivelRiesgo",
      authController.isAuth,
      adminController.getNivelRiesgo
    );
    this.router.post(
      "/nivelRiesgo",
      authController.isAuth,
      adminController.createNivelRiesgo
    );

    this.router.get(
      "/riesgoAsociado",
      authController.isAuth,
      adminController.getRiesgoAsociado
    );

    this.router.get(
      "/auditor",
      authController.isAuth,
      adminController.get_Auditor
    );
    this.router.get(
      "/grcAudit",

      adminController.getGrcAud
    );

    // this.router.get('/:id',gamesController.getOne)
    // this.router.post('/',gamesController.create);
    // this.router.delete('/:id',gamesController.delete);
    // this.router.put('/:id',gamesController.update)
  }
}

const adminRoutes = new AdminRoutes();

export default adminRoutes.router;
