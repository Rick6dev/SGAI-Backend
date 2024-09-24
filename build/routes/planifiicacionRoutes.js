"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planificacionController_1 = require("../controllers/planificacionController");
class PlanificacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/calendar", planificacionController_1.planificacionController.getPlanificacionCalendar);
        this.router.get("/macroproceso", planificacionController_1.planificacionController.getMacroproceso);
        this.router.post("/macroproceso", planificacionController_1.planificacionController.postMacroproceso);
        this.router.post("/proceso", planificacionController_1.planificacionController.postProceso);
        this.router.get("/proceso", planificacionController_1.planificacionController.getProceso);
        this.router.get("/tipoproceso", planificacionController_1.planificacionController.getTipoProceso);
        this.router.get("/procesoGroup/:id", planificacionController_1.planificacionController.getGroupProceso);
        this.router.get("/subprocesoGroup/:id", planificacionController_1.planificacionController.getGroupSubProceso);
        this.router.post("/macroproceso", planificacionController_1.planificacionController.getMacroproceso);
        this.router.post("/proceso", planificacionController_1.planificacionController.getMacroproceso);
        this.router.post("/subprocesoPost", planificacionController_1.planificacionController.postSubproceso);
        this.router.get("/getplanificacion", planificacionController_1.planificacionController.getPlanificacion);
        this.router.get("/getPlanificacionAsignados/:id", planificacionController_1.planificacionController.getPlanificacionAsignados);
        this.router.get("/getPlanificacionProceso/:id", planificacionController_1.planificacionController.getPlanificacionProceso);
        this.router.get("/getPlanificacionCulminado/:id", planificacionController_1.planificacionController.getPlanificacionCulminado);
        this.router.get("/getPlanificacionCulminadoEntregaGerente/:id_area", planificacionController_1.planificacionController.getPlanificacionCulminadoEntregaGerente);
        this.router.get("/getPlanificacionAprobado/gerente/:id_area", planificacionController_1.planificacionController.getPlanificacionAprobadoGerente);
        this.router.get("/getPlanificacionRechazado/gerente/:id_area", planificacionController_1.planificacionController.getPlanificacionRechazadoGerente);
        this.router.get("/getPlanificacionAprobadoEntregaVp/", planificacionController_1.planificacionController.getPlanificacionAprobadoGerenteEntregaVp);
        this.router.get("/getPlanificacionAprobado/vp", planificacionController_1.planificacionController.getPlanificacionAprobadoVp);
        this.router.get("/getPlanificacionAprobado/condicinal", planificacionController_1.planificacionController.getPlanificacionAprobadoVpCondicional);
        this.router.get("/getPlanificacionRechazado/vp", planificacionController_1.planificacionController.getPlanificacionRechazadoVp);
        this.router.get("/getPlanificacionComentario/:id_planificacion_auditoria", planificacionController_1.planificacionController.getPlanificacionComentario);
        this.router.get("/getPlanificacionCulminado/:id", planificacionController_1.planificacionController.getPlanificacionCulminado);
        this.router.get("/getPlanificacionComentario/:id", planificacionController_1.planificacionController.getPlanificacionComentario);
        this.router.post("/postplanificacion", planificacionController_1.planificacionController.postPlanifacion);
        this.router.get("/planificacionGroup", planificacionController_1.planificacionController.getGroupPlanificacion);
        this.router.put("/upadateplanificacion", planificacionController_1.planificacionController.updatePlanifacion);
        this.router.put("/upadateplanificacionStatus", planificacionController_1.planificacionController.updatePlanifacionStatus);
        this.router.post("/postComentarioPlanificacion", planificacionController_1.planificacionController.postPlanifacionComentario);
        this.router.delete("/deleteplanificacion/:id_planificacion_auditoria", planificacionController_1.planificacionController.deletePlanifacion);
        this.router.get("/auditores", planificacionController_1.planificacionController.getAuditores);
    }
}
const planificacionRoutes = new PlanificacionRoutes();
exports.default = planificacionRoutes.router;
