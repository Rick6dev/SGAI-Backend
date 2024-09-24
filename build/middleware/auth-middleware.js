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
exports.authController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt = __importStar(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../keys"));
const activedirectory2_1 = __importDefault(require("activedirectory2"));
const activedirectory_1 = require("../config/activedirectory");
const extractAuditor_1 = require("../utils/extractAuditor");
const EmpleadoModel_1 = __importDefault(require("../Model/EmpleadoModel"));
class AuthController {
    isAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let tokenStruct = {
                    payload: {
                        userId: 0,
                        userNombre: "",
                        message: " ",
                        role: 0,
                        areaTrabajo: "",
                        iat: 0,
                        exp: 0,
                    },
                };
                const secret = keys_1.default.adminData.SECRET_TOKEN;
                const options = { complete: true };
                const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
                if (!token) {
                    return res
                        .status(403)
                        .json({ message: "No se ha proporcionado un token de acceso" });
                }
                tokenStruct = jwt.decode(token, options);
                const tokenExp = tokenStruct.payload.exp - Math.floor(new Date().getTime() / 1000);
                if (tokenExp < 0) {
                    return res.status(403).json({ message: "El token ha caducado" });
                }
                next();
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    return res.status(401).json({ message: error });
                }
                else {
                    console.error(error);
                    return res.status(500).json({ message: "Error interno del servidor" });
                }
            }
        });
    }
    UserDirectory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const mail = (0, extractAuditor_1.formatEmail)(username);
            let noUser = false;
            var ad = new activedirectory2_1.default(activedirectory_1.configLdap);
            let countOptions = {
                where: { mail: mail },
            };
            try {
                let count = yield EmpleadoModel_1.default.count(countOptions);
                if (count === 0) {
                    noUser = true;
                    res.status(203).json({
                        noAccess: noUser,
                        message: "El usuario  ingresado no esta en la  bases de de datos",
                    });
                }
                else {
                    ad.authenticate(mail, password, function (err, auth) {
                        if (err) {
                            console.log(err);
                            return res.status(403).send({
                                message: "Los datos ingresados, no son correctos. Intente nuevamente.",
                            });
                        }
                        if (auth) {
                            next();
                        }
                        else {
                            return res.status(400).send({
                                message: "Intente nuevamente, si persiste el error, contacte al administrador del sistema.",
                            });
                        }
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send({
                    message: "Intente nuevamente, si persiste el error, contacte al administrador del sistema.",
                });
            }
        });
    }
}
exports.authController = new AuthController();
