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
exports.hallazgoController = exports.HallazgoController = void 0;
const HallazgoModel_1 = __importDefault(require("../Model/HallazgoModel"));
const InformeAuditoria_1 = __importDefault(require("../Model/InformeAuditoria"));
const NvlRiesgoModel_1 = __importDefault(require("../Model/NvlRiesgoModel"));
const RsgModel_1 = __importDefault(require("../Model/RsgModel"));
const HallazgoSeguimiento_1 = __importDefault(require("../Model/HallazgoSeguimiento"));
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const join_1 = require("../utils/join");
const extractGrc_1 = require("../utils/extractGrc");
const extractHllz_1 = require("../utils/extractHllz");
const extractOneHllz_1 = require("../utils/extractOneHllz");
const extractEmpleados_1 = require("../utils/extractEmpleados");
const extractHllzStatus_1 = require("../utils/extractHllzStatus");
const extractComent_1 = require("../utils/extractComent");
const JoinComent_1 = require("../utils/JoinComent");
const extractHllzGrcAud_1 = require("../utils/extractHllzGrcAud");
const AuditModel_1 = __importDefault(require("../Model/AuditModel"));
const reportGerencia_1 = require("../utils/reportGerencia");
const extractVP_1 = require("../utils/extractVP");
const extracrGrcsReport_1 = require("../utils/extracrGrcsReport");
const extractVPE_1 = require("../utils/extractVPE");
const GrcHistoricoModel_1 = __importDefault(require("../Model/GrcHistoricoModel"));
class HallazgoController {
    groupHallazgo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cerrados = [];
                let abiertos = [];
                let totales = [];
                cerrados = yield HallazgoModel_1.default.findAll({
                    attributes: [
                        [sequelize_1.Sequelize.fn("YEAR", database_1.sequelize.col("created_year")), "created_year"],
                        [sequelize_1.Sequelize.fn("COUNT", "*"), "total"], // Count all hallazgos
                        [
                            sequelize_1.Sequelize.fn("COUNT", database_1.sequelize.col("cerrado")), // Count closed hallazgos
                            "total_cerrados",
                        ],
                        [sequelize_1.Sequelize.col("id_gerencia_encargada"), "id_gerencia_encargada"],
                    ],
                    where: {
                        cerrado: 1,
                    },
                    group: ["created_year", "id_gerencia_encargada"],
                    order: [[sequelize_1.Sequelize.col("created_year"), "DESC"]],
                });
                abiertos = yield HallazgoModel_1.default.findAll({
                    attributes: [
                        [sequelize_1.Sequelize.fn("YEAR", database_1.sequelize.col("created_year")), "created_year"],
                        [sequelize_1.Sequelize.fn("COUNT", "*"), "total"], // Count all hallazgos
                        [
                            sequelize_1.Sequelize.fn("COUNT", database_1.sequelize.col("cerrado")), // Count closed hallazgos
                            "total_abiertos",
                        ],
                        [sequelize_1.Sequelize.col("id_gerencia_encargada"), "id_gerencia_encargada"],
                    ],
                    where: {
                        cerrado: 0,
                    },
                    group: ["created_year", "id_gerencia_encargada"],
                    order: [[sequelize_1.Sequelize.col("created_year"), "DESC"]],
                });
                totales = yield HallazgoModel_1.default.findAll({
                    attributes: [
                        "id_gerencia_encargada",
                        "created_year",
                        [
                            database_1.sequelize.fn("SUM", database_1.sequelize.literal("CASE WHEN cerrado = 1 THEN 1 ELSE 0 END")),
                            "casos_cerrados",
                        ],
                        [
                            database_1.sequelize.fn("SUM", database_1.sequelize.literal("CASE WHEN cerrado = 0 THEN 1 ELSE 0 END")),
                            "casos_abiertos",
                        ],
                        [database_1.sequelize.fn("COUNT", database_1.sequelize.col("id_hallazgo")), "total_casos"], // Cambié COUNT(*) por COUNT(id_hallazgo)
                    ],
                    group: ["id_gerencia_encargada", "created_year"],
                    order: [
                        ["created_year", "DESC"],
                        ["id_gerencia_encargada", "ASC"],
                    ],
                });
                const results = {
                    totales,
                    cerrados,
                    abiertos,
                };
                if (cerrados.length === 0) {
                    res.status(204).json({ message: "No fueron encontrados casos" });
                }
                else {
                    res.status(200).json(results);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `${error}`,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const today = new Date();
                const year = today.getFullYear();
                let { detalle, fecha_compromiso, recomendacion, id_riesgo, accion, id_nivel, id_gerencia, id_auditor, estatus, id_informe, id_gerencia_encargada, } = req.body;
                detalle = detalle.trim();
                fecha_compromiso = new Date(fecha_compromiso);
                id_riesgo = parseInt(id_riesgo);
                id_nivel = parseInt(id_nivel);
                yield HallazgoModel_1.default.create({
                    hallazgo_reportado: detalle,
                    recomendacion: recomendacion,
                    estatus_Plan_Accion: estatus,
                    id_informe_auditoria: id_informe,
                    id_auditor_responsable: id_auditor,
                    id_nivel_riesgo: id_nivel,
                    id_riesgo_asociado: id_riesgo,
                    id_gerencia: id_gerencia,
                    id_gerencia_encargada: id_gerencia_encargada,
                    accion_correctiva: accion,
                    created_year: year,
                });
                res
                    .status(201)
                    .json({ text: "El hallazgo fue creado satisfactoriamente" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    updateHallazgo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_hallazgo, hallazgo_reportado, fecha_compromiso, fecha_cierre, accion_correctiva, cerrado, estatus_Plan_Accion, recomen, comentario, fecha_comentario, id_auditor_responsable, } = req.body;
                yield HallazgoModel_1.default.update({
                    hallazgo_reportado: hallazgo_reportado,
                    recomendacion: recomen,
                    fecha_compromiso: fecha_compromiso,
                    fecha_cierre: fecha_cierre,
                    estatus_Plan_Accion: estatus_Plan_Accion,
                    accion_correctiva: accion_correctiva,
                    cerrado: cerrado,
                }, {
                    where: {
                        id_hallazgo: id_hallazgo,
                    },
                });
                yield HallazgoSeguimiento_1.default.create({
                    comentario: comentario,
                    fecha_comentario: fecha_comentario,
                    id_auditor_responsable: id_auditor_responsable,
                    id_hallazgo: id_hallazgo,
                });
                res.status(201).json({ text: "Hallazgo creado correctamente" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `${error}`,
                });
            }
        });
    }
    aperturarHallazgo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_hallazgo, status, fecha_cierre, cerrado } = req.body;
                console.log(req.body);
                yield HallazgoModel_1.default.update({
                    estatus_Plan_Accion: status,
                    fecha_cierre: null,
                    cerrado: cerrado,
                }, {
                    where: {
                        id_hallazgo: id_hallazgo,
                    },
                });
                res.status(201).json({ text: "Hallazgo Aperturado" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `${error}`,
                });
            }
        });
    }
    AprobarHallazgo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_hallazgo, aprobar } = req.body;
                const state = aprobar ? 1 : 0;
                yield HallazgoModel_1.default.update({
                    aprobado: state,
                }, {
                    where: {
                        id_hallazgo: id_hallazgo,
                    },
                });
                res.status(201).json({ text: "Hallazgo Actualizado correctamente" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    getComent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comentarios = yield HallazgoSeguimiento_1.default.findAll({
                    where: {
                        id_hallazgo: id,
                    },
                });
                const auditor = yield (0, extractComent_1.ExtractEmpleadoComentr)();
                const comentsData = yield (0, JoinComent_1.JoinComent)(comentarios, auditor);
                if (comentarios.length === 0) {
                    res
                        .status(204)
                        .json({ message: "Comentarios del hallazgo no encontrados" });
                }
                else {
                    res.status(200).json(comentsData);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `${error}`,
                });
            }
        });
    }
    get_hallazgoOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const hallazgos = yield (0, extractOneHllz_1.ExtracOneHllz)(id);
                const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                let auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                const hallazgoData = yield (0, join_1.Join)(hallazgos, gerencias, auditor);
                if (hallazgoData.length === 0) {
                    res.status(204).json({ message: "No hay VPEs" });
                }
                else {
                    res.status(200).json(hallazgoData[0]);
                }
            }
            catch (error) {
                console.error(`Error fetching VPEs: ${error}`);
                res.status(500).json({ message: `Error fetching VPEs: ${error}` });
            }
        });
    }
    get_hallazgo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prevpagina = parseInt(req.params.pagina);
                let pagina = prevpagina === 0 ? 1 : prevpagina;
                const cantidad = 7;
                const yearData = req.params.yearInf;
                let countData = 0;
                let count = yield HallazgoModel_1.default.count({
                    where: {
                        created_year: yearData, // or replace with your desired year
                    },
                });
                countData =
                    count % cantidad === 0
                        ? Math.trunc(count / cantidad)
                        : Math.trunc(count / cantidad) + 1;
                pagina = pagina > countData ? (pagina = 1) : pagina;
                const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                const hallazgos = yield (0, extractHllz_1.ExtracHllz)(pagina, yearData);
                const auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                const hallazgosData = yield (0, join_1.Join)(hallazgos, gerencias, auditor);
                const total_paginas = countData == null ? 0 : countData;
                const hallazgo = {
                    data: hallazgosData,
                    pagina: pagina,
                    total_paginas: total_paginas,
                };
                if (count === 0) {
                    res
                        .status(404)
                        .json({ message: "El hallazgo solicitado no fue  encontrado" });
                }
                else {
                    res.status(200).json(hallazgo);
                }
            }
            catch (error) {
                console.error(`Error fetching VPEs: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    get_hallazgo_filter_estatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pagina = parseInt(req.params.pagina);
                let estatus = req.params.estatus;
                let message = "Data";
                let yearInf = req.params.yearInf;
                const cantidad = 7;
                estatus =
                    estatus != "Cerrado" ? (estatus = estatus + "%") : (estatus = estatus);
                let countOptions = {};
                if (countOptions == "Seleccion%") {
                    countOptions = {
                        where: {
                            estatus_Plan_Accion: estatus,
                            created_year: yearInf,
                        },
                    };
                }
                else {
                    countOptions = {
                        where: {
                            cerrado: 0,
                            created_year: yearInf,
                        },
                    };
                }
                let auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                let count = yield HallazgoModel_1.default.count(countOptions);
                const countData = count % cantidad === 0
                    ? Math.trunc(count / cantidad)
                    : Math.trunc(count / cantidad) + 1;
                pagina = pagina > countData ? (pagina = 1) : pagina;
                const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                let hallazgos = [];
                hallazgos = yield (0, extractHllzStatus_1.ExtracHllz_Estatus)(estatus, pagina, yearInf);
                if (count === 0) {
                    count = yield HallazgoModel_1.default.count();
                    hallazgos = yield (0, extractHllz_1.ExtracHllz)(pagina, yearInf);
                    message = "No hemos encontrado ";
                }
                else {
                    message = "Data";
                }
                const hallazgosData = yield (0, join_1.Join)(hallazgos, gerencias, auditor);
                const hallazgo = {
                    data: hallazgosData,
                    pagina: pagina,
                    total_paginas: countData,
                    message: message,
                };
                if (count === 0) {
                    res.status(404).json({
                        message: "No se encontraron hallazgos",
                    });
                }
                else {
                    res.status(200).json(hallazgo);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Se ha producido un error en el servidor .Contactar con el administrador",
                    error,
                });
            }
        });
    }
    get_hallazgo_filter_grcsAud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prevpagina = parseInt(req.params.pagina);
                let pagina = prevpagina === 0 ? 1 : prevpagina;
                let Grcs = req.params.grcs;
                let yearHllz = req.params.yearInf;
                let yearData = 0;
                let message = "Data";
                Grcs = parseInt(Grcs);
                let countOptions = {
                    where: { id_gerencia_encargada: Grcs, created_year: yearHllz },
                };
                let count = yield HallazgoModel_1.default.count(countOptions);
                const cantidad = 7;
                let countData = 0;
                countData =
                    count % cantidad === 0
                        ? Math.trunc(count / cantidad)
                        : Math.trunc(count / cantidad) + 1;
                pagina = pagina > countData ? (pagina = 1) : pagina;
                const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                let hallazgos = [];
                hallazgos = yield (0, extractHllzGrcAud_1.ExtracHllz_GrcAud)(Grcs, pagina, yearHllz);
                if (hallazgos.length === 0) {
                    hallazgos = yield (0, extractHllz_1.ExtracHllz)(pagina, yearData);
                    message = "No hemos encontrado ";
                }
                else {
                    message = "Data";
                }
                let auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                const hallazgosData = yield (0, join_1.Join)(hallazgos, gerencias, auditor);
                const hallazgo = {
                    data: hallazgosData,
                    pagina: pagina,
                    total_paginas: countData,
                    cantidad: count,
                    message: message,
                };
                if (hallazgos.length === 0) {
                    res.status(204).json({
                        message: "No se encontraron hallazgos",
                    });
                }
                else {
                    res.status(200).json(hallazgo);
                }
            }
            catch (error) {
                console.error(`Error fetching data: ${error}`);
                res.status(500).json({
                    message: "Se ha producido un error en el servidor .Contactar con el administrador",
                });
            }
        });
    }
    get_hallazgo_filter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_informe = req.params.id;
                const hallazgo = yield HallazgoModel_1.default.findAll({
                    where: {
                        id_informe_auditoria: id_informe,
                    },
                    include: [
                        {
                            model: InformeAuditoria_1.default,
                            attributes: ["nombre_informe", "cod_informe", "trimestre"],
                        },
                        {
                            model: NvlRiesgoModel_1.default,
                            attributes: ["id_nivel_riesgo", "nombre_nivel_riesgo"],
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
                const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                let auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                const hallazgosData = yield (0, join_1.Join)(hallazgo, gerencias, auditor);
                if (hallazgo.length === 0) {
                    res.status(404).json({ message: "No hay hallazgos" });
                }
                else {
                    res.status(200).json(hallazgosData);
                }
            }
            catch (error) {
                console.error(`Error fetching hallazgos: ${error}`);
                res.status(500).json({
                    message: `El servidor  fallado no fueron encontrados los  hallazgos: ${error}`,
                });
            }
        });
    }
    delete_hallazgoOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield HallazgoSeguimiento_1.default.destroy({
                    where: { id_hallazgo: id },
                });
                yield HallazgoModel_1.default.destroy({
                    where: { id_hallazgo: id },
                });
                res.status(204).json({ message: "Hallazgo Eliminado Correctamente" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    getReporteVpe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const vpes = yield (0, extractVPE_1.extractVpe)(id);
                let vps = [];
                let hallazgosUnificadosreport = [];
                let idGrcJoin = [];
                let idvpsJoin = [];
                const idsGerencia = [];
                const idsVps = [];
                for (let vpe of vpes) {
                    vps = yield (0, extractVP_1.extractVp)(vpe.id_vpe);
                    idvpsJoin.push({
                        vps,
                    });
                }
                for (const Vpid of idvpsJoin) {
                    const vicepresidencias = Vpid.vps;
                    for (const vicepresidencia of vicepresidencias) {
                        idsVps.push(vicepresidencia.id_vp);
                    }
                }
                for (let idsVp of idsVps) {
                    const idGrc = yield (0, extracrGrcsReport_1.ExtractsAllGerencia)(idsVp);
                    idGrcJoin.push({
                        idGrc,
                    });
                }
                for (const gerencia of idGrcJoin) {
                    const hallazgos = gerencia.idGrc;
                    for (const hallazgo of hallazgos) {
                        idsGerencia.push(hallazgo.id_gerencia);
                    }
                }
                for (const idGerencia of idsGerencia) {
                    const hallazgosF = yield (0, reportGerencia_1.reportGerencia)(idGerencia);
                    if (hallazgosF.length > 0) {
                        hallazgosUnificadosreport.push({
                            hallazgosF,
                        });
                    }
                }
                if (hallazgosUnificadosreport.length == 0) {
                    res.status(404).send({ message: "No se encontraron resultados" });
                }
                else {
                    const nuevoArray = [];
                    for (let i = 0; i < hallazgosUnificadosreport.length; i++) {
                        const objeto = hallazgosUnificadosreport[i].hallazgosF;
                        // ... procesar objeto
                        nuevoArray.push(objeto);
                    }
                    const hallazgosUnificados2 = [];
                    for (const hallazgoActual of nuevoArray) {
                        for (const hallazgo of hallazgoActual) {
                            hallazgosUnificados2.push(hallazgo);
                        }
                    }
                    const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                    let auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                    const hallazgosData = yield (0, join_1.Join)(hallazgosUnificados2, gerencias, auditor);
                    res.status(200).json(hallazgosData);
                }
            }
            catch (error) {
                console.error(`Ocurrio un error al generar el reporte ${error}`);
                res
                    .status(500)
                    .json({ message: `Ocurrio un error al generar el reporte: ${error}` });
            }
        });
    }
    getReporteVp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const vps = yield (0, extractVP_1.extractVp)(id);
                const vpsData = {
                    vps: vps,
                    countvp: vps.length,
                };
                let hallazgosUnificadosreport = [];
                let idGrcJoin = [];
                const idsGerencia = [];
                for (let vp of vps) {
                    const idGrc = yield (0, extracrGrcsReport_1.ExtractsAllGerencia)(vp.id_vp);
                    idGrcJoin.push({
                        idGrc,
                    });
                }
                for (const gerencia of idGrcJoin) {
                    const hallazgos = gerencia.idGrc;
                    for (const hallazgo of hallazgos) {
                        idsGerencia.push(hallazgo.id_gerencia);
                    }
                }
                for (const idGerencia of idsGerencia) {
                    const hallazgosF = yield (0, reportGerencia_1.reportGerencia)(idGerencia);
                    if (hallazgosF) {
                        if (hallazgosF.length > 0) {
                            hallazgosUnificadosreport.push({
                                hallazgosF,
                            });
                        }
                    }
                }
                if (hallazgosUnificadosreport.length === 0) {
                    res.status(404).json({
                        message: "No fue posible encontrar hallazgo para esta VP intenta con otra",
                    });
                }
                else {
                    const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                    let auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                    const hallazgoData = yield (0, join_1.Join)(hallazgosUnificadosreport[0].hallazgosF, gerencias, auditor);
                    res.status(200).json(hallazgoData);
                }
            }
            catch (error) {
                console.error(`Ocurrio un error al generar el reporte ${error}`);
                res
                    .status(500)
                    .json({ message: `Ocurrio un error al generar el reporte: ${error}` });
            }
        });
    }
    getReporteGerencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const hallazgos = yield (0, reportGerencia_1.reportGerencia)(id);
                const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                let auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                const hallazgoData = yield (0, join_1.Join)(hallazgos, gerencias, auditor);
                if (hallazgos.length === 0) {
                    res.status(404).json({ message: "No hay hallazgos" });
                }
                else {
                    res.status(200).json(hallazgoData);
                }
            }
            catch (error) {
                console.error(`Error fetching VPEs: ${error}`);
                res.status(500).json({ message: `Error en el servidor: ${error}` });
            }
        });
    }
    get_hallazgoAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pagina = parseInt(req.params.pagina);
                const cantidad = 7;
                const yearData = req.params.yearInf;
                let countData = 0;
                pagina = pagina > countData ? (pagina = 1) : pagina;
                const gerencias = yield (0, extractGrc_1.ExtracGrc)();
                const hallazgos = yield HallazgoModel_1.default.findAll({
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
                    order: [[sequelize_1.Sequelize.col("fecha_creacion"), "desc"]],
                });
                const auditor = yield (0, extractEmpleados_1.ExtractEmpleado)();
                const hallazgosData = yield (0, join_1.Join)(hallazgos, gerencias, auditor);
                const total_paginas = countData == null ? 0 : countData;
                console.log(hallazgosData);
                if (hallazgos.length === 0) {
                    res
                        .status(404)
                        .json({ message: "El hallazgo solicitado no fue  encontrado" });
                }
                else {
                    res.status(200).json(hallazgosData);
                }
            }
            catch (error) {
                console.error(`Error fetching VPEs: ${error}`);
                res.status(500).json({
                    message: "Se ha producido un error en el servidor .Contactar con el administrador",
                });
            }
        });
    }
}
exports.HallazgoController = HallazgoController;
exports.hallazgoController = new HallazgoController();
