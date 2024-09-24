"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginController = void 0;
const extractSupervisor_1 = require("../utils/extractSupervisor");
const extractAuditor_1 = require("../utils/extractAuditor");
const EmpleadoModel_1 = __importDefault(require("../Model/EmpleadoModel"));
const jwt = __importStar(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../keys"));
const AuditModel_1 = __importDefault(require("../Model/AuditModel"));
const determineUserAccess_1 = require("../utils/determineUserAccess");
const RolModel_1 = __importDefault(require("../Model/RolModel"));
class LoginController {
    loginValidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                let UserAud = {
                    nombre: "",
                    apellido: "",
                };
                let mail = username;
                let noUser = false;
                mail = (0, extractAuditor_1.formatEmail)(mail);
                const nombre = mail.split(".")[0];
                const apellido = mail.split(".")[1].split("@")[0];
                let countOptions = {
                    where: { mail: mail },
                };
                let count2 = yield EmpleadoModel_1.default.count(countOptions);
                if (count2 === 0) {
                    noUser = true;
                    res.status(203).json({
                        noAccess: noUser,
                        message: "El usuario ingresado no se encuentra en la bases de datos",
                    });
                }
                else {
                    let userF = yield (0, extractAuditor_1.ExtractUsuario)(mail);
                    const { rol, user, areaTrabajo, noUser } = yield (0, determineUserAccess_1.determineUserAccess)(username);
                    const role = yield RolModel_1.default.findOne({
                        where: {
                            id_rol: rol,
                        },
                    });
                    if (noUser) {
                        res.status(203).json({
                            noAccess: noUser,
                            message: "No tienes los permisos  para acceder",
                        });
                    }
                    else {
                        let count = yield AuditModel_1.default.count({
                            where: {
                                mail: mail,
                            },
                        });
                        if (count == 0) {
                            yield AuditModel_1.default.create({
                                nombre: nombre,
                                apellido: apellido,
                                mail: mail,
                                ci_empleado: user[0].ci_empleado
                            });
                        }
                        UserAud = yield (0, extractAuditor_1.ExtractUsuarioAuditor)(mail);
                        console.log(UserAud);
                        const token = jwt.sign({
                            userId: UserAud[0].id_auditor_responsable,
                            userNombre: `${UserAud[0].nombre} ${UserAud[0].apellido} `,
                            message: ` Bienvenido ${role.rol} ${UserAud[0].nombre} ${UserAud[0].apellido}, tu area es ${areaTrabajo} `,
                            role: role.id_rol,
                            namerole: role.rol,
                            areaTrabajo: areaTrabajo,
                            ci_empleado: UserAud[0].ci_empleado,
                        }, keys_1.default.adminData.SECRET_TOKEN, { expiresIn: "1h" });
                        res.status(200).json(token);
                    }
                }
            }
            catch (error) {
                res.status(500).json({
                    noAccess: true,
                    message: `Se ha producido un error inesperado . Por favor, póngase en contacto con el administrador del sitio. ${error}`,
                });
            }
        });
    }
    getEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supervisor = yield (0, extractSupervisor_1.ExtracSup)();
                if (supervisor.length === 0) {
                    res.status(204).json({ message: "No existe este supervisor" });
                }
                else {
                    res.status(200).json(supervisor);
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: `Error  en el servidor  al solicitar  un usuario ` });
            }
        });
    }
}
exports.loginController = new LoginController();
