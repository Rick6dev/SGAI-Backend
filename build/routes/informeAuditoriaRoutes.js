"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const informeAuditoriaController_1 = require("../controllers/informeAuditoriaController");
class InformeAudRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/update", informeAuditoriaController_1.informeAudController.updateInforme);
        this.router.post("/", informeAuditoriaController_1.informeAudController.create);
        this.router.get("/list/:pagina/:year", informeAuditoriaController_1.informeAudController.list);
        this.router.get("/getOneInforme/:cod", informeAuditoriaController_1.informeAudController.getOneInforme);
        this.router.delete("/delete/:id", informeAuditoriaController_1.informeAudController.deleteOneInforme);
    }
}
const informeAudRoutes = new InformeAudRoutes();
exports.default = informeAudRoutes.router;
