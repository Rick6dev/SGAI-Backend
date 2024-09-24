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
exports.ExtracHllz_Estatus = ExtracHllz_Estatus;
const HallazgoModel_1 = __importDefault(require("../Model/HallazgoModel"));
const InformeAuditoria_1 = __importDefault(require("../Model/InformeAuditoria"));
const NvlRiesgoModel_1 = __importDefault(require("../Model/NvlRiesgoModel"));
const RsgModel_1 = __importDefault(require("../Model/RsgModel"));
const AuditModel_1 = __importDefault(require("../Model/AuditModel"));
const GrcHistoricoModel_1 = __importDefault(require("../Model/GrcHistoricoModel"));
function ExtracHllz_Estatus(estatus, paginas, yearInf) {
    return __awaiter(this, void 0, void 0, function* () {
        const cantidad = 7;
        const pagina = paginas;
        let estatu = estatus;
        console.log(estatu);
        if (estatu === "Seleccion%") {
            const hallazgos = yield HallazgoModel_1.default.findAll({
                // attributes: ['id_hallazgo', 'cod_informe','hallazgo_reportado','recomendacion','accion_correctiva','fecha_compromiso','fecha_cierre','fecha_creacion','estatus_Plan_Accion','cerrado','id_informe_auditoria','id_auditor_responsable','id_gerencia','id_nivel_riesgo','id_riesgo_asociado'],
                // attributes:['id_hallazgo'],
                include: [
                    {
                        model: InformeAuditoria_1.default,
                        attributes: ["nombre_informe", "cod_informe"],
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
                where: {
                    cerrado: 0,
                    created_year: yearInf,
                },
            });
            return hallazgos;
        }
        console.log(pagina);
        const hallazgos = yield HallazgoModel_1.default.findAll({
            // attributes: ['id_hallazgo', 'cod_informe','hallazgo_reportado','recomendacion','accion_correctiva','fecha_compromiso','fecha_cierre','fecha_creacion','estatus_Plan_Accion','cerrado','id_informe_auditoria','id_auditor_responsable','id_gerencia','id_nivel_riesgo','id_riesgo_asociado'],
            // attributes:['id_hallazgo'],
            include: [
                {
                    model: InformeAuditoria_1.default,
                    attributes: ["nombre_informe", "cod_informe"],
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
            where: {
                estatus_Plan_Accion: estatu,
                created_year: yearInf,
            },
        });
        return hallazgos;
    });
}
