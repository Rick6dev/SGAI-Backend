"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const auth_middleware_1 = require("../middleware/auth-middleware");
class AdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/riesgoAsociado", auth_middleware_1.authController.isAuth, adminController_1.adminController.createRiesgoAsociado);
        this.router.post("/tipoAud", auth_middleware_1.authController.isAuth, adminController_1.adminController.createTipoAuditoria);
        this.router.get("/", auth_middleware_1.authController.isAuth, adminController_1.adminController.get_VPE);
        this.router.get("/VPE/:id", auth_middleware_1.authController.isAuth, adminController_1.adminController.get_VP);
        this.router.get("/VP/:id", auth_middleware_1.authController.isAuth, adminController_1.adminController.get_Gerencia);
        this.router.get("/tipoAud", auth_middleware_1.authController.isAuth, adminController_1.adminController.get_Tipo_Auditoria);
        this.router.get("/exist", auth_middleware_1.authController.isAuth, adminController_1.adminController.existTipoAuditoria);
        this.router.get("/nivelRiesgo", auth_middleware_1.authController.isAuth, adminController_1.adminController.getNivelRiesgo);
        this.router.post("/nivelRiesgo", auth_middleware_1.authController.isAuth, adminController_1.adminController.createNivelRiesgo);
        this.router.get("/riesgoAsociado", auth_middleware_1.authController.isAuth, adminController_1.adminController.getRiesgoAsociado);
        this.router.get("/auditor", auth_middleware_1.authController.isAuth, adminController_1.adminController.get_Auditor);
        this.router.get("/grcAudit", adminController_1.adminController.getGrcAud);
        // this.router.get('/:id',gamesController.getOne)
        // this.router.post('/',gamesController.create);
        // this.router.delete('/:id',gamesController.delete);
        // this.router.put('/:id',gamesController.update)
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
