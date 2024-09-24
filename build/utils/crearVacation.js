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
exports.crearVacacion = crearVacacion;
exports.deleteVacacion = deleteVacacion;
const VacacionModel_1 = __importDefault(require("../Model/VacacionModel"));
function crearVacacion(solicitud, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        yield VacacionModel_1.default.create({
            fecha_inicio: solicitud.fecha_desde,
            fecha_reingreso: solicitud.fecha_reintegro,
            fecha_culminacion: solicitud.fecha_hasta,
            id_auditor_responsable: id,
            year: añoActual
        });
        return;
    });
}
function deleteVacacion(solicitud) {
    return __awaiter(this, void 0, void 0, function* () {
        const fechaActual = new Date();
        console.log(solicitud);
        yield VacacionModel_1.default.destroy({
            where: { id_vacacion: solicitud.id_vacacion },
        });
        return;
    });
}
