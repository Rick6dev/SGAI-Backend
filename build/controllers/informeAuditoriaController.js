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
exports.informeAudController = exports.InformeAudController = void 0;
const TipoAuditoriaModel_1 = __importDefault(require("../Model/TipoAuditoriaModel"));
const InformeAuditoria_1 = __importDefault(require("../Model/InformeAuditoria"));
const utils_1 = require("../utils/utils");
const HallazgoModel_1 = __importDefault(require("../Model/HallazgoModel"));
const sequelize_1 = require("sequelize");
const HallazgoSeguimiento_1 = __importDefault(require("../Model/HallazgoSeguimiento"));
class InformeAudController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "";
                let countData = 0;
                let year = req.params.year;
                let count = yield InformeAuditoria_1.default.count({
                    where: {
                        created_year: year,
                    },
                });
                let yearData = 0;
                const pagina = parseInt(req.params.pagina);
                const cantidad = 11;
                if (count == 0) {
                    yearData = 2024;
                    message = "No fueron encontrados Informes en este año ";
                    countData =
                        (yield count) % cantidad === 0
                            ? Math.trunc(count / cantidad)
                            : Math.trunc(count / cantidad) + 1;
                }
                else {
                    yearData = year;
                    message = "Informes Encontrados ";
                    countData =
                        (yield count) % cantidad === 0
                            ? Math.trunc(count / cantidad)
                            : Math.trunc(count / cantidad) + 1;
                }
                const Informes = yield InformeAuditoria_1.default.findAll({
                    attributes: [
                        "id_informe_auditoria",
                        "cod_informe",
                        "nombre_informe",
                        "trimestre",
                        "id_gerencia_encargada",
                        "fecha_creacion",
                        "created_year",
                    ],
                    include: [
                        {
                            model: TipoAuditoriaModel_1.default,
                            attributes: ["nombre_tipo_auditoria", "cod_tipo_auditoria"],
                        },
                    ],
                    where: {
                        created_year: yearData,
                    },
                    limit: cantidad,
                    offset: (pagina - 1) * cantidad,
                    order: [[sequelize_1.Sequelize.col("id_informe_auditoria"), "desc"]],
                });
                const informes = {
                    data: Informes,
                    pagina: pagina,
                    total_paginas: countData,
                    message: message,
                };
                res.status(200).json(informes);
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    getOneInforme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod } = req.params;
                const informe = yield InformeAuditoria_1.default.findOne({
                    where: {
                        cod_informe: cod,
                    },
                });
                if (!informe) {
                    res.status(404).json({ message: "Codigo Informe no encontrado" });
                }
                else {
                    res.status(200).json(informe);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, nombre_informe, select_one_tipoGrc, timestre, fk_tipoAud, currentYear, } = req.body;
                const uniqueCode = yield (0, utils_1.generateUniqueCode)(code);
                const grc = select_one_tipoGrc == "GAOF" ? 2 : 1;
                yield InformeAuditoria_1.default.create({
                    id_gerencia_encargada: grc,
                    created_year: currentYear,
                    nombre_informe,
                    cod_informe: uniqueCode,
                    trimestre: timestre,
                    id_tipo_auditoria: fk_tipoAud,
                });
                res.status(201).json({ text: "Informe creado satisfactoriamente" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador`,
                });
            }
        });
    }
    updateInforme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_informe_auditoria, nombre_informe } = req.body;
                yield InformeAuditoria_1.default.update({
                    nombre_informe,
                }, {
                    where: {
                        id_informe_auditoria: id_informe_auditoria,
                    },
                });
                res.status(201).json({ text: "Informe Actualizado" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    deleteOneInforme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const hallazgos = yield HallazgoModel_1.default.findAll({
                    attributes: ["id_hallazgo"],
                    where: { id_informe_auditoria: id },
                });
                for (const hallazgo of hallazgos) {
                    yield HallazgoSeguimiento_1.default.destroy({
                        where: { id_hallazgo: hallazgo.dataValues.id_hallazgo },
                    });
                }
                yield HallazgoModel_1.default.destroy({
                    where: { id_informe_auditoria: id },
                });
                yield InformeAuditoria_1.default.destroy({
                    where: {
                        id_informe_auditoria: id,
                    },
                });
                res.status(204).json({ message: "Informe borrado exitosamente" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor contactate con el administrador  ${error}`,
                });
            }
        });
    }
}
exports.InformeAudController = InformeAudController;
exports.informeAudController = new InformeAudController();
