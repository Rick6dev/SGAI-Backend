"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineUserAccess = determineUserAccess;
const asignacionRol_1 = require("./asignacionRol");
const extractAuditor_1 = require("./extractAuditor");
const extractSupervisor_1 = require("./extractSupervisor");
function determineUserAccess(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let noUser = false;
        let rol = 0;
        let areaTrabajo = "";
        let mail = (0, extractAuditor_1.formatEmail)(username);
        let user = yield (0, extractAuditor_1.ExtractUsuario)(mail);
        const supervisorGAT = yield (0, extractSupervisor_1.ExtracSupOneGAT)();
        const supervisorGAOF = yield (0, extractSupervisor_1.ExtracSupOneGAOF)();
        const vicepresidente = yield (0, extractSupervisor_1.ExtracSupVp)();
        const auditor = yield (0, extractAuditor_1.ExtractAuditor)(mail);
        switch (user[0].id_cargo) {
            case 3:
                if (user[0].ci_empleado === vicepresidente[0].ci_supervisor) {
                    areaTrabajo = "GAT/GAOF";
                    rol = yield (0, asignacionRol_1.RolVP)();
                }
                else {
                    noUser = true;
                }
                break;
            case 4:
                try {
                    const { areaTrabajoGr, noUserGrc } = yield (0, asignacionRol_1.asignarAreaTrabajoGrc)(user, supervisorGAT, supervisorGAOF);
                    areaTrabajo = areaTrabajoGr;
                    rol = yield (0, asignacionRol_1.RolGr)();
                    noUser = noUserGrc;
                }
                catch (error) {
                    console.error("Error assigning area for Grupo de Riesgos Contractuales:", error);
                }
                break;
            case 11:
                try {
                    const { areaTrabajoAud, noUserAud } = yield (0, asignacionRol_1.asignarAreaTrabajoAuditor)(user, supervisorGAT, supervisorGAOF);
                    rol = yield (0, asignacionRol_1.RolAud)();
                    user = auditor;
                    areaTrabajo = areaTrabajoAud;
                    noUser = noUserAud;
                }
                catch (error) {
                    console.error("Error assigning area for Auditor:", error);
                }
                break;
            default:
                noUser = true;
        }
        return { rol, user, areaTrabajo, noUser };
    });
}
