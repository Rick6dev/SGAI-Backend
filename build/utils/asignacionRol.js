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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignarAreaTrabajoGrc = asignarAreaTrabajoGrc;
exports.asignarAreaTrabajoAuditor = asignarAreaTrabajoAuditor;
exports.RolVP = RolVP;
exports.RolGr = RolGr;
exports.RolAud = RolAud;
exports.areaTrabajoSelect = areaTrabajoSelect;
const GrcAudit_1 = __importDefault(require("../Model/GrcAudit"));
const RolModel_1 = __importDefault(require("../Model/RolModel"));
function asignarAreaTrabajoGrc(user, supervisorGAT, supervisorGAOF) {
    return __awaiter(this, void 0, void 0, function* () {
        const ciEmpleado = user[0].ci_empleado;
        let areaTrabajoGr = "";
        let noUserGrc = false;
        if (ciEmpleado === supervisorGAT[0].ci_supervisor ||
            ciEmpleado === supervisorGAOF[0].ci_supervisor) {
            areaTrabajoGr =
                ciEmpleado === supervisorGAT[0].ci_supervisor
                    ? yield areaTrabajoSelect(1)
                    : yield areaTrabajoSelect(2);
        }
        else {
            noUserGrc = true;
        }
        return { areaTrabajoGr, noUserGrc };
    });
}
function asignarAreaTrabajoAuditor(auditor, supervisorGAT, supervisorGAOF) {
    return __awaiter(this, void 0, void 0, function* () {
        let areaTrabajoAud = "";
        let noUserAud = false;
        if (auditor[0].id_sup === supervisorGAT[0].id_supervisor) {
            areaTrabajoAud = yield areaTrabajoSelect(1);
        }
        else if (auditor[0].id_sup === supervisorGAOF[0].id_supervisor) {
            areaTrabajoAud = yield areaTrabajoSelect(2);
        }
        else {
            noUserAud = true;
        }
        return { areaTrabajoAud, noUserAud }; // NoUser is not returned, as it's not used later
    });
}
function RolVP() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rol] = yield RolModel_1.default.findAll({
                where: {
                    id_rol: 1,
                    activo: 1,
                },
            });
            if (rol) {
                return rol.id_rol;
            }
            else {
                console.warn("No se ha encontrado ningún rol con rol 'Vicepresidente' y activo = 1");
                return undefined;
            }
        }
        catch (error) {
            console.error("Error al buscar el rol:", error);
            throw error;
        }
    });
}
function RolGr() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rol] = yield RolModel_1.default.findAll({
                where: {
                    rol: "gerente",
                    activo: 1,
                },
            });
            if (rol) {
                return rol.id_rol;
            }
            else {
                console.warn("No se ha encontrado ningún rol con rol 'superAdmin' y activo = 1");
                return undefined;
            }
        }
        catch (error) {
            console.error("Error al buscar el rol:", error);
            throw error;
        }
    });
}
function RolAud() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rol] = yield RolModel_1.default.findAll({
                where: {
                    rol: "auditor",
                    activo: 1,
                },
            });
            if (rol) {
                return rol.id_rol;
            }
            else {
                console.warn("No se ha encontrado ningún rol con rol 'superAdmin' y activo = 1");
                return undefined;
            }
        }
        catch (error) {
            console.error("Error al buscar el rol:", error);
            throw error;
        }
    });
}
function areaTrabajoSelect(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gerenciaEncargada = yield GrcAudit_1.default.findOne({
                where: {
                    id_gerencia_encargada: id,
                },
            });
            if (gerenciaEncargada) {
                return gerenciaEncargada.gerencia_encargada;
            }
            else {
                console.warn("No se ha encontrado ningún area de Trabajo");
                return undefined;
            }
        }
        catch (error) {
            console.error("Error al buscar el Area de Trabajo:", error);
            throw error;
        }
    });
}
