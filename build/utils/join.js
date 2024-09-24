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
exports.Join = Join;
function Join(hallazgos, gerencias, auditores) {
    return __awaiter(this, void 0, void 0, function* () {
        const hallazgosUnificados = [];
        for (let hallazgo of hallazgos) {
            if (hallazgo.id_gerencia != 0) {
                const gerencia = gerencias.find((gerencia) => gerencia.id_gerencia === hallazgo.id_gerencia);
                if (gerencia) {
                    hallazgo.gerencia_responsable_historico.gerencia_historico =
                        gerencia.nombre_gerencia;
                    hallazgo.id_gerencia_historico = gerencia;
                    hallazgo.gerencia = gerencia;
                    // hallazgo.gerencia_responsable_historico.id_gerencia_historico =
                    //   gerencia.intra_vp.nombre_vp;
                }
            }
            // hallazgo.id_nivel_riesgo = hallazgo.Nivel_Riesgo.nombre_nivel_riesgo;
            hallazgosUnificados.push(Object.assign({}, hallazgo));
        }
        const hallazgosData = hallazgosUnificados.map((hallazgosUnificado) => hallazgosUnificado.dataValues);
        return hallazgosData;
    });
}
