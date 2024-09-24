import { Router } from "express";
import { informeAudController } from "../controllers/informeAuditoriaController";
class InformeAudRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/update", informeAudController.updateInforme);
    this.router.post("/", informeAudController.create);
    this.router.get("/list/:pagina/:year", informeAudController.list);
    this.router.get("/getOneInforme/:cod", informeAudController.getOneInforme);
    this.router.delete("/delete/:id", informeAudController.deleteOneInforme);
  }
}

const informeAudRoutes = new InformeAudRoutes();

export default informeAudRoutes.router;
