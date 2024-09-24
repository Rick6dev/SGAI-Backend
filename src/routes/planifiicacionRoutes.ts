import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { authController } from "../middleware/auth-middleware";
import { planificacionController } from "../controllers/planificacionController";

class PlanificacionRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get(
      "/calendar",
      planificacionController.getPlanificacionCalendar
    );
    this.router.get("/macroproceso", planificacionController.getMacroproceso);
    this.router.post("/macroproceso", planificacionController.postMacroproceso);
    this.router.post("/proceso", planificacionController.postProceso);
    this.router.get("/proceso", planificacionController.getProceso);
    this.router.get("/tipoproceso", planificacionController.getTipoProceso);
    this.router.get(
      "/procesoGroup/:id",
      planificacionController.getGroupProceso
    );
    this.router.get(
      "/subprocesoGroup/:id",
      planificacionController.getGroupSubProceso
    );
    this.router.post("/macroproceso", planificacionController.getMacroproceso);
    this.router.post("/proceso", planificacionController.getMacroproceso);
    this.router.post("/subprocesoPost", planificacionController.postSubproceso);
    this.router.get(
      "/getplanificacion",
      planificacionController.getPlanificacion
    );
    this.router.get(
      "/getPlanificacionAsignados/:id",
      planificacionController.getPlanificacionAsignados
    );
    this.router.get(
      "/getPlanificacionProceso/:id",
      planificacionController.getPlanificacionProceso
    );
    this.router.get(
      "/getPlanificacionCulminado/:id",
      planificacionController.getPlanificacionCulminado
    );
    this.router.get(
      "/getPlanificacionCulminadoEntregaGerente/:id_area",
      planificacionController.getPlanificacionCulminadoEntregaGerente
    );
    this.router.get(
      "/getPlanificacionAprobado/gerente/:id_area",
      planificacionController.getPlanificacionAprobadoGerente
    );
    this.router.get(
      "/getPlanificacionRechazado/gerente/:id_area",
      planificacionController.getPlanificacionRechazadoGerente
    );
    this.router.get(
      "/getPlanificacionAprobadoEntregaVp/",
      planificacionController.getPlanificacionAprobadoGerenteEntregaVp
    );
    this.router.get(
      "/getPlanificacionAprobado/vp",
      planificacionController.getPlanificacionAprobadoVp
    );
    this.router.get(
      "/getPlanificacionAprobado/condicinal",
      planificacionController.getPlanificacionAprobadoVpCondicional
    );

    this.router.get(
      "/getPlanificacionRechazado/vp",
      planificacionController.getPlanificacionRechazadoVp
    );
    this.router.get(
      "/getPlanificacionComentario/:id_planificacion_auditoria",
      planificacionController.getPlanificacionComentario
    );
    this.router.get(
      "/getPlanificacionCulminado/:id",
      planificacionController.getPlanificacionCulminado
    );
    this.router.get(
      "/getPlanificacionComentario/:id",
      planificacionController.getPlanificacionComentario
    );
    this.router.post(
      "/postplanificacion",
      planificacionController.postPlanifacion
    );
    this.router.get(
      "/planificacionGroup",
      planificacionController.getGroupPlanificacion
    );
    this.router.put(
      "/upadateplanificacion",
      planificacionController.updatePlanifacion
    );
    this.router.put(
      "/upadateplanificacionStatus",
      planificacionController.updatePlanifacionStatus
    );
    this.router.post(
      "/postComentarioPlanificacion",
      planificacionController.postPlanifacionComentario
    );
    this.router.delete(
      "/deleteplanificacion/:id_planificacion_auditoria",
      planificacionController.deletePlanifacion
    );
    this.router.get("/auditores", planificacionController.getAuditores);
  }
}

const planificacionRoutes = new PlanificacionRoutes();

export default planificacionRoutes.router;
