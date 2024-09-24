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
exports.JoinComent = JoinComent;
function JoinComent(coments, auditores) {
    return __awaiter(this, void 0, void 0, function* () {
        const comentsUnificados = [];
        for (const coment of coments) {
            const auditor = auditores.find((auditor) => auditor.id_auditor_responsable === coment.id_auditor_responsable);
            if (auditor) {
                if (auditor) {
                    coment.id_auditor_responsable = auditor;
                }
                comentsUnificados.push(Object.assign({}, coment));
            }
        }
        const comentsData = comentsUnificados.map((comentsUnificados) => comentsUnificados.dataValues);
        return comentsData;
    });
}
