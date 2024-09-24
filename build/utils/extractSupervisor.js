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
exports.ExtracSup = ExtracSup;
exports.ExtracSupOneGAT = ExtracSupOneGAT;
exports.ExtracSupOneGAOF = ExtracSupOneGAOF;
exports.ExtracSupVp = ExtracSupVp;
const SupervisorModel_1 = __importDefault(require("../Model/SupervisorModel"));
function ExtracSup() {
    return __awaiter(this, void 0, void 0, function* () {
        const supervisor = yield SupervisorModel_1.default.findAll({
            attributes: ["id_supervisor", "ci_supervisor", "nombre_sup1", "apellido_sup1", "id_cargo", "id_dpto", "id_gerencia", "id_vp", "id_vpe", "id_pe", "id_status"],
            where: {
                id_status: 1,
            },
        });
        return supervisor;
    });
}
function ExtracSupOneGAT() {
    return __awaiter(this, void 0, void 0, function* () {
        const supervisor = yield SupervisorModel_1.default.findAll({
            attributes: ["id_supervisor", "ci_supervisor", "nombre_sup1", "apellido_sup1", "id_cargo", "id_dpto", "id_gerencia", "id_vp", "id_vpe", "id_pe", "id_status"],
            where: {
                id_gerencia: 58,
            },
        });
        return supervisor;
    });
}
function ExtracSupOneGAOF() {
    return __awaiter(this, void 0, void 0, function* () {
        const supervisor = yield SupervisorModel_1.default.findAll({
            attributes: ["id_supervisor", "ci_supervisor", "nombre_sup1", "apellido_sup1", "id_cargo", "id_dpto", "id_gerencia", "id_vp", "id_vpe", "id_pe", "id_status"],
            where: {
                id_gerencia: 57,
            },
        });
        return supervisor;
    });
}
function ExtracSupVp() {
    return __awaiter(this, void 0, void 0, function* () {
        const supervisor = yield SupervisorModel_1.default.findAll({
            attributes: ["id_supervisor", "ci_supervisor", "nombre_sup1", "apellido_sup1", "id_cargo", "id_dpto", "id_gerencia", "id_vp", "id_vpe", "id_pe", "id_status"],
            where: {
                id_vp: 13
            },
        });
        return supervisor;
    });
}
