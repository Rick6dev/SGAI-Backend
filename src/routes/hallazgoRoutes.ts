import { Router } from "express";

import { hallazgoController } from "../controllers/hallazgoController";
import { authController } from "../middleware/auth-middleware";

class HallazgoRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/group", hallazgoController.groupHallazgo);
    this.router.post("/updateHallazgo", hallazgoController.updateHallazgo);
    this.router.post("/aperturar", hallazgoController.aperturarHallazgo);
    this.router.post("/aprobar", hallazgoController.AprobarHallazgo);
    this.router.post("/", authController.isAuth, hallazgoController.create);
    this.router.get("/listAll/", hallazgoController.get_hallazgoAll);
    this.router.get("/list/:pagina/:yearInf", hallazgoController.get_hallazgo);
    this.router.get("/:id", hallazgoController.get_hallazgoOne);
    this.router.get("/listcoment/:id", hallazgoController.getComent);
    this.router.delete("/delete/:id", hallazgoController.delete_hallazgoOne);
    this.router.get("/listfilter/:id", hallazgoController.get_hallazgo_filter);
    this.router.get("/reportGrc/:id", hallazgoController.getReporteGerencia);
    this.router.get("/reportVp/:id", hallazgoController.getReporteVp);
    this.router.get("/reportVpe/:id", hallazgoController.getReporteVpe);
    this.router.get(
      "/listfilterestatus/:pagina/:estatus/:yearInf",
      hallazgoController.get_hallazgo_filter_estatus
    );
    this.router.get(
      "/listfilterGrcsAud/:grcs/:pagina/:yearInf",
      hallazgoController.get_hallazgo_filter_grcsAud
    );
  }
}

const hallazgoRoutes = new HallazgoRoutes();

export default hallazgoRoutes.router;
