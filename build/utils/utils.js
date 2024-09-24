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
exports.generateUniqueCode = generateUniqueCode;
const InformeAuditoria_1 = __importDefault(require("../Model/InformeAuditoria"));
function generateUniqueCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        let existingInforme = yield InformeAuditoria_1.default.findOne({
            where: { cod_informe: code },
        });
        let count = 1;
        while (existingInforme) {
            const num = parseInt(code.slice(-9, -7));
            const updatedNum = String(num + 1).padStart(2, "0");
            const updatedCode = `${code.slice(0, -9)}${updatedNum}${code.slice(-7)}`;
            existingInforme = yield InformeAuditoria_1.default.findOne({
                where: { cod_informe: updatedCode },
            });
            count++;
            code = updatedCode;
        }
        return code;
    });
}
