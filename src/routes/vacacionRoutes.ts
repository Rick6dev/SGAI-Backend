import { Router } from "express";
import { vacationController } from "../controllers/vacacionController";

class VacacionRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    config():void{
        this.router.get("/getAll",vacationController.getVacation)
        this.router.post("/createVacation",vacationController.create)
        this.router.get("/getOneVacation/:id",vacationController.getOneVacation)
        this.router.get("/countVacation/:id",vacationController.countVacation)
        this.router.delete("/deleteVacation/:id",vacationController.delete);
        this.router.put("/updateVacation/",vacationController.update);
        this.router.get("/filterVacation/:fechaInicio/:fechaCulminacion",vacationController.getFilterVacation);
        this.router.get("/intravacation/:ci_empleado/:id",vacationController.getIntraVacation)

    }
}
const vacationRoutes =new VacacionRoutes();
export default vacationRoutes.router;

