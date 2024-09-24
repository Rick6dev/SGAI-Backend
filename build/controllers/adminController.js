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
exports.adminController = exports.AdminController = void 0;
const VPEModel_1 = __importDefault(require("../Model/VPEModel"));
const VPModel_1 = __importDefault(require("../Model/VPModel"));
const GrcModel_1 = __importDefault(require("../Model/GrcModel"));
const NvlRiesgoModel_1 = __importDefault(require("../Model/NvlRiesgoModel"));
const RsgModel_1 = __importDefault(require("../Model/RsgModel"));
const TipoAuditoriaModel_1 = __importDefault(require("../Model/TipoAuditoriaModel"));
const extractEmpleados_1 = require("../utils/extractEmpleados");
const GrcAudit_1 = __importDefault(require("../Model/GrcAudit"));
class AdminController {
    get_VPE(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vpes = yield VPEModel_1.default.findAll({
                    where: { status: true },
                    attributes: ["id_vpe", "nombre_vpe"],
                });
                if (vpes.length === 0) {
                    res
                        .status(204)
                        .json({ message: "Vicepresidencias Ejecutivas no disponibles" });
                }
                else {
                    res.status(200).json(vpes);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    get_VP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const vps = yield VPModel_1.default.findAll({
                    where: {
                        status: 1,
                        id_vpe: id,
                    },
                });
                if (vps.length === 0) {
                    res
                        .status(204)
                        .json({ message: "Vicepresidencias Ejecutivas no disponibles" });
                }
                else {
                    res.status(200).json(vps);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    get_Gerencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const gerencias = yield GrcModel_1.default.findAll({
                    where: {
                        id_vp: id,
                        status: 1,
                    },
                });
                if (gerencias.length === 0) {
                    res.status(404).json({ message: "Gerencias no encontradas" });
                }
                else {
                    res.status(200).json(gerencias);
                }
            }
            catch (error) {
                console.error(`Error fetching gerencias: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    getRiesgoAsociado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const riesgoAsociado = yield RsgModel_1.default.findAll({
                    attributes: ["id_riesgo_asociado", "nombre_riesgo_asociado"],
                });
                if (riesgoAsociado.length === 0) {
                    res.status(204).json({ message: "No hay niveles de riesgo" });
                }
                else {
                    res.status(200).json(riesgoAsociado);
                }
            }
            catch (error) {
                console.error(`Error fetching niveles de riesgo: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    getGrcAud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gerenciasAud = yield GrcAudit_1.default.findAll({
                    attributes: ["id_gerencia_encargada", "gerencia_encargada"],
                });
                if (gerenciasAud.length === 0) {
                    res.status(204).json({ message: "Gerencia de Auditoria" });
                }
                else {
                    res.status(200).json(gerenciasAud);
                }
            }
            catch (error) {
                console.error(`Error Gerencia de Auditoria: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${{
                        error,
                    }}`,
                });
            }
        });
    }
    createRiesgoAsociado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nombre = req.body.nombre;
                const existeRiesgo = yield RsgModel_1.default.count({
                    where: {
                        nombre_riesgo_asociado: nombre,
                    },
                });
                if (existeRiesgo > 0) {
                    res
                        .status(409)
                        .json({ message: "Riesgo asociado ya existe en la  base de datos." });
                }
                else {
                    yield RsgModel_1.default.create({
                        nombre_riesgo_asociado: nombre,
                    });
                    res
                        .status(201)
                        .json({ message: "Riesgo asociado creado correctamente " });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    getNivelRiesgo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nivelRiesgo = yield NvlRiesgoModel_1.default.findAll({
                    attributes: ["id_nivel_riesgo", "nombre_nivel_riesgo"],
                });
                if (nivelRiesgo.length === 0) {
                    res.status(204).json({ message: "No hay riesgos asociados" });
                }
                else {
                    res.status(200).json(nivelRiesgo);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    createNivelRiesgo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre } = req.body;
                const existeRiesgo = yield NvlRiesgoModel_1.default.count({
                    where: {
                        nombre_nivel_riesgo: nombre,
                    },
                });
                if (existeRiesgo > 0) {
                    res.status(409).json({
                        message: "El nivel de Riesgo  existe en la bases de datos ",
                    });
                }
                else {
                    yield NvlRiesgoModel_1.default.create({
                        nombre_nivel_riesgo: nombre,
                    });
                    res
                        .status(201)
                        .json({ message: "El nivel de Riesgo fue  creado correctamente " });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    get_Tipo_Auditoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoAuditoria = yield TipoAuditoriaModel_1.default.findAll();
                if (tipoAuditoria.length === 0) {
                    res
                        .status(404)
                        .json({ message: "No se encontraron tipos de auditoría" });
                }
                else {
                    res.status(200).json(tipoAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    existTipoAuditoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, codigo } = req.body;
                const count = yield TipoAuditoriaModel_1.default.findOne({
                    where: { cod_tipo_auditoria: codigo },
                });
                if (count) {
                    if (count > 0) {
                        res.status(200).json(count);
                    }
                    else {
                        res.status(201).json({ message: "La auditoria se puede procesar " });
                    }
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error}`,
                });
            }
        });
    }
    createTipoAuditoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, codigo } = req.body;
                const existeNombre = yield TipoAuditoriaModel_1.default.count({
                    where: {
                        nombre_tipo_auditoria: nombre,
                    },
                });
                const existeCodigo = yield TipoAuditoriaModel_1.default.count({
                    where: {
                        cod_tipo_auditoria: codigo,
                    },
                });
                if (existeNombre > 0 || existeCodigo > 0) {
                    res.status(409).json({
                        message: "La Tipo de Auditoria o el codigo ya existe en la base de datos.",
                    });
                }
                else {
                    yield TipoAuditoriaModel_1.default.create({
                        cod_tipo_auditoria: codigo,
                        nombre_tipo_auditoria: nombre,
                    });
                    res.status(201).json({ message: "Tipo de Auditoria Creada " });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    get_Auditor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                if (auditor.length === 0) {
                    res.status(404).json({ message: "No se encontraron Auditores" });
                }
                else {
                    res.status(200).json(auditor);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
}
exports.AdminController = AdminController;
exports.adminController = new AdminController();
