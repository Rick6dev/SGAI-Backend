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
exports.ExtractAuditor = ExtractAuditor;
exports.ExtractUsuario = ExtractUsuario;
exports.ExtractUsuarioAuditor = ExtractUsuarioAuditor;
exports.formatEmail = formatEmail;
exports.ExtractAuditorVP = ExtractAuditorVP;
exports.ExtractAuditorGrc = ExtractAuditorGrc;
const AuditModel_1 = __importDefault(require("../Model/AuditModel"));
const EmpleadoModel_1 = __importDefault(require("../Model/EmpleadoModel"));
function ExtractAuditor(mail) {
    return __awaiter(this, void 0, void 0, function* () {
        const empleados = yield EmpleadoModel_1.default.findAll({
            where: {
                id_status: 1,
                id_cargo: 11,
                mail: mail,
            },
        });
        return empleados;
    });
}
function ExtractUsuario(mail) {
    return __awaiter(this, void 0, void 0, function* () {
        const empleados = yield EmpleadoModel_1.default.findAll({
            where: {
                id_status: 1,
                mail: mail,
            },
        });
        return empleados;
    });
}
function ExtractUsuarioAuditor(mail) {
    return __awaiter(this, void 0, void 0, function* () {
        const auditor = yield AuditModel_1.default.findAll({
            where: {
                mail: mail,
            },
        });
        return auditor;
    });
}
function formatEmail(email) {
    let mail = email;
    mail = mail.trimStart();
    mail = mail.trimEnd();
    // Si el correo electrónico ya tiene el dominio, devuélvelo como está.
    if (mail.indexOf("@credicard.com.ve") > -1 ||
        mail.indexOf("@CREDICARD.COM.VE") > -1) {
        return mail;
    }
    return mail + "@credicard.com.ve";
}
function ExtractAuditorVP(mail) {
    return __awaiter(this, void 0, void 0, function* () {
        const empleados = yield EmpleadoModel_1.default.findAll({
            where: {
                id_status: 1,
                id_cargo: 3,
                mail: mail,
            },
        });
        return empleados;
    });
}
function ExtractAuditorGrc(mail) {
    return __awaiter(this, void 0, void 0, function* () {
        const empleados = yield EmpleadoModel_1.default.findAll({
            where: {
                id_status: 1,
                id_cargo: 4,
                mail: mail,
            },
        });
        return empleados;
    });
}
