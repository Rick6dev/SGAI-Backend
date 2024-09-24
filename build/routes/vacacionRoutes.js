"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacacionController_1 = require("../controllers/vacacionController");
class VacacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/getAll", vacacionController_1.vacationController.getVacation);
        this.router.post("/createVacation", vacacionController_1.vacationController.create);
        this.router.get("/getOneVacation/:id", vacacionController_1.vacationController.getOneVacation);
        this.router.get("/countVacation/:id", vacacionController_1.vacationController.countVacation);
        this.router.delete("/deleteVacation/:id", vacacionController_1.vacationController.delete);
        this.router.put("/updateVacation/", vacacionController_1.vacationController.update);
        this.router.get("/filterVacation/:fechaInicio/:fechaCulminacion", vacacionController_1.vacationController.getFilterVacation);
        this.router.get("/intravacation/:ci_empleado/:id", vacacionController_1.vacationController.getIntraVacation);
    }
}
const vacationRoutes = new VacacionRoutes();
exports.default = vacationRoutes.router;
