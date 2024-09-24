"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hallazgoController_1 = require("../controllers/hallazgoController");
const auth_middleware_1 = require("../middleware/auth-middleware");
class HallazgoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/group", hallazgoController_1.hallazgoController.groupHallazgo);
        this.router.post("/updateHallazgo", hallazgoController_1.hallazgoController.updateHallazgo);
        this.router.post("/aperturar", hallazgoController_1.hallazgoController.aperturarHallazgo);
        this.router.post("/aprobar", hallazgoController_1.hallazgoController.AprobarHallazgo);
        this.router.post("/", auth_middleware_1.authController.isAuth, hallazgoController_1.hallazgoController.create);
        this.router.get("/listAll/", hallazgoController_1.hallazgoController.get_hallazgoAll);
        this.router.get("/list/:pagina/:yearInf", hallazgoController_1.hallazgoController.get_hallazgo);
        this.router.get("/:id", hallazgoController_1.hallazgoController.get_hallazgoOne);
        this.router.get("/listcoment/:id", hallazgoController_1.hallazgoController.getComent);
        this.router.delete("/delete/:id", hallazgoController_1.hallazgoController.delete_hallazgoOne);
        this.router.get("/listfilter/:id", hallazgoController_1.hallazgoController.get_hallazgo_filter);
        this.router.get("/reportGrc/:id", hallazgoController_1.hallazgoController.getReporteGerencia);
        this.router.get("/reportVp/:id", hallazgoController_1.hallazgoController.getReporteVp);
        this.router.get("/reportVpe/:id", hallazgoController_1.hallazgoController.getReporteVpe);
        this.router.get("/listfilterestatus/:pagina/:estatus/:yearInf", hallazgoController_1.hallazgoController.get_hallazgo_filter_estatus);
        this.router.get("/listfilterGrcsAud/:grcs/:pagina/:yearInf", hallazgoController_1.hallazgoController.get_hallazgo_filter_grcsAud);
    }
}
const hallazgoRoutes = new HallazgoRoutes();
exports.default = hallazgoRoutes.router;
