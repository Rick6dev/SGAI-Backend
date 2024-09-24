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
exports.reportGerencia = reportGerencia;
const HallazgoModel_1 = __importDefault(require("../Model/HallazgoModel"));
const InformeAuditoria_1 = __importDefault(require("../Model/InformeAuditoria"));
const NvlRiesgoModel_1 = __importDefault(require("../Model/NvlRiesgoModel"));
const RsgModel_1 = __importDefault(require("../Model/RsgModel"));
const AuditModel_1 = __importDefault(require("../Model/AuditModel"));
const GrcHistoricoModel_1 = __importDefault(require("../Model/GrcHistoricoModel"));
function reportGerencia(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let hallazgos = yield HallazgoModel_1.default.findAll({
            where: {
                id_gerencia: id,
            },
            include: [
                {
                    model: InformeAuditoria_1.default,
                    attributes: ["nombre_informe", "cod_informe", "trimestre"],
                },
                {
                    model: NvlRiesgoModel_1.default,
                    attributes: ["nombre_nivel_riesgo"],
                },
                {
                    model: RsgModel_1.default,
                    attributes: ["nombre_riesgo_asociado"],
                },
                {
                    model: AuditModel_1.default,
                    attributes: ["id_auditor_responsable", "nombre", "apellido"],
                },
                {
                    model: GrcHistoricoModel_1.default,
                    attributes: ["id_gerencia_historico", "gerencia_historico"],
                },
            ],
        });
        return hallazgos;
    });
}
