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
exports.planificacionController = void 0;
const AuditModel_1 = __importDefault(require("../Model/AuditModel"));
const sequelize_1 = require("sequelize");
const MacroprocesoModel_1 = __importDefault(require("../Model/MacroprocesoModel"));
const Proceso_1 = __importDefault(require("../Model/Proceso"));
const TipoProcesosModel_1 = __importDefault(require("../Model/TipoProcesosModel"));
const SubProcesoModel_1 = __importDefault(require("../Model/SubProcesoModel"));
const PlanificacionModel_1 = __importDefault(require("../Model/PlanificacionModel"));
const PlanificacionComentarioModel_1 = __importDefault(require("../Model/PlanificacionComentarioModel"));
class PlanificacionController {
    getMacroproceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const macroprocesos = yield MacroprocesoModel_1.default.findAll({
                    order: [[sequelize_1.Sequelize.col("nombre_macroproceso"), "asc"]],
                });
                if (macroprocesos.length === 0) {
                    res.status(204).json({ message: "Vacaciones " });
                }
                else {
                    res.status(200).json(macroprocesos);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    getTipoProceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoProceso = yield TipoProcesosModel_1.default.findAll({});
                if (tipoProceso.length === 0) {
                    res.status(204).json({ message: "Vacaciones " });
                }
                else {
                    res.status(200).json(tipoProceso);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    postMacroproceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { macroproceso } = req.body;
                console.log(req.body);
                const existeNombre = yield MacroprocesoModel_1.default.count({
                    where: {
                        nombre_macroproceso: macroproceso,
                    },
                });
                if (existeNombre > 0) {
                    res.status(409).json({
                        message: "El macroproceso ingresado se encuentre registrado.",
                    });
                }
                else {
                    yield MacroprocesoModel_1.default.create({
                        nombre_macroproceso: macroproceso,
                    });
                    res
                        .status(201)
                        .json({ text: "Macroproceso creado satisfactoriamente" });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador`,
                });
            }
        });
    }
    getProceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const procesos = yield Proceso_1.default.findAll({
                    include: [
                        {
                            model: TipoProcesosModel_1.default,
                        },
                        {
                            model: MacroprocesoModel_1.default,
                        },
                    ],
                });
                if (procesos.length === 0) {
                    res.status(204).json({ message: "Procesos no encontrados" });
                }
                else {
                    res.status(200).json(procesos);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    postProceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { proceso, id_tipo_proceso, id_macroproceso } = req.body;
                const existeNombre = yield Proceso_1.default.count({
                    where: {
                        nombre_proceso: proceso,
                    },
                });
                if (existeNombre > 0) {
                    res.status(409).json({
                        message: "El Proceso ingresado se encuentre registrado.",
                    });
                }
                else {
                    yield Proceso_1.default.create({
                        nombre_proceso: proceso,
                        id_tipo_proceso: id_tipo_proceso,
                        id_macroproceso: id_macroproceso,
                    });
                    res.status(201).json({ text: "Informe creado satisfactoriamente" });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
                });
            }
        });
    }
    getPlanificacionCalendar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    attributes: [
                        ["id_planificacion_auditoria", "id"],
                        "cantidad_subprocesos",
                        ["fecha_culminacion", "end"],
                        ["fecha_inicio", "start"],
                    ],
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                });
                if (planificacionAuditoria.length === 0) {
                    res.status(204).json({ message: "Vacaciones " });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getGroupProceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const procesos = yield Proceso_1.default.findAll({
                    include: [
                        {
                            model: TipoProcesosModel_1.default,
                        },
                        {
                            model: MacroprocesoModel_1.default,
                        },
                    ],
                    where: {
                        id_macroproceso: id, // or replace with your desired year
                    },
                });
                if (procesos.length === 0) {
                    res.status(204).json({ message: "Procesos no encontrados" });
                }
                else {
                    res.status(200).json(procesos);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    postSubproceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Hola");
                const { id_macroproceso, id_proceso, subproceso } = req.body;
                const existeNombre = yield SubProcesoModel_1.default.count({
                    where: {
                        nombre_subproceso: subproceso,
                    },
                });
                if (existeNombre > 0) {
                    res.status(409).json({
                        message: "El subproceso ingresado se encuentre registrado.",
                    });
                }
                else {
                    yield SubProcesoModel_1.default.create({
                        nombre_subproceso: subproceso,
                        id_proceso: id_proceso,
                    });
                    res.status(201).json({ text: "Subproceso creado satisfactoriamente" });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
                });
            }
        });
    }
    getGroupSubProceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const subprocesos = yield SubProcesoModel_1.default.findAll({
                    include: [
                        {
                            model: Proceso_1.default,
                        },
                    ],
                    where: {
                        id_proceso: id,
                    },
                });
                if (subprocesos.length === 0) {
                    res.status(204).json({ message: "SubProcesos no encontrados" });
                }
                else {
                    res.status(200).json(subprocesos);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    postPlanifacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { id_gerencia_encargada, estado, id_auditor_responsable, id_auditor_secundario, id_auditor_terciario, id_macroproceso, id_proceso, id_subproceso, fecha_inicio, fecha_culminacion, cantidad_subprocesos, flagAS400, flagSAP, flagISTCLEAR, flagIST77, flagIST73, flagNAIGUATA, flagDA, flagFULL, created_year, mount_end, } = req.body;
                yield PlanificacionModel_1.default.create({
                    id_gerencia_encargada: id_gerencia_encargada,
                    id_auditor_responsable: id_auditor_responsable,
                    id_auditor_secundario: id_auditor_secundario,
                    id_auditor_terciario: id_auditor_terciario,
                    id_subproceso: id_subproceso,
                    fecha_inicio: fecha_inicio,
                    fecha_culminacion: fecha_culminacion,
                    cantidad_subprocesos: cantidad_subprocesos,
                    entrega: null,
                    // fechaInicioProceso:'000-00-00',
                    flagAS400: flagAS400,
                    flagSAP: flagSAP,
                    flagISTCLEAR: flagISTCLEAR,
                    flagIST77: flagIST77,
                    flagIST73: flagIST73,
                    flagNAIGUATA: flagNAIGUATA,
                    flagDA: flagDA,
                    flagFULL: flagFULL,
                    created_year: created_year,
                    mount_end: mount_end,
                    estado: estado,
                });
                res.status(201).json({ text: "Informe creado satisfactoriamente" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
                });
            }
        });
    }
    postPlanifacionComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { comentario, id_planificacion_auditoria, role, id_auditor_responsable, } = req.body;
                yield PlanificacionComentarioModel_1.default.create({
                    comentario: comentario,
                    id_planificacion_auditoria: id_planificacion_auditoria,
                    id_auditor_responsable: id_auditor_responsable,
                    role: role,
                });
                res.status(201).json({ text: "Comentario registrado" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
                });
            }
        });
    }
    updatePlanifacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const {id_planificacion_auditoria}=req.params;
                const { id_planificacion_auditoria, id_gerencia_encargada, id_auditor_responsable, id_auditor_secundario, id_auditor_terciario, id_macroproceso, id_proceso, id_subproceso, fecha_inicio, fecha_culminacion, cantidad_subprocesos, flagAS400, flagSAP, flagISTCLEAR, flagIST77, flagIST73, flagNAIGUATA, flagDA, flagFULL, created_year, mount_end, } = req.body;
                yield PlanificacionModel_1.default.update({
                    id_gerencia_encargada: id_gerencia_encargada,
                    id_auditor_responsable: id_auditor_responsable,
                    id_auditor_secundario: id_auditor_secundario,
                    id_auditor_terciario: id_auditor_terciario,
                    id_subproceso: id_subproceso,
                    fecha_inicio: fecha_inicio,
                    fecha_culminacion: fecha_culminacion,
                    cantidad_subprocesos: cantidad_subprocesos,
                    flagAS400: flagAS400,
                    flagSAP: flagSAP,
                    flagISTCLEAR: flagISTCLEAR,
                    flagIST77: flagIST77,
                    flagIST73: flagIST73,
                    flagNAIGUATA: flagNAIGUATA,
                    flagDA: flagDA,
                    flagFULL: flagFULL,
                    created_year: created_year,
                    mount_end: mount_end,
                }, {
                    where: {
                        id_planificacion_auditoria: id_planificacion_auditoria,
                    },
                });
                res
                    .status(201)
                    .json({ text: "Planificación actualizado satisfactoriamente" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
                });
            }
        });
    }
    updatePlanifacionStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Enviado", req.body);
                // const {id_planificacion_auditoria}=req.params;
                const { id_planificacion_auditoria, flagProceso, mount_end, flagAsignado, estado, flagDesaprobadoVp, flagAprobadoGerente, flagAprobadoVp, flagCulminado, flagDesaprobadoGerente, fecha_culminado_auditor, fecha_proceso, fecha_avalado, fecha_aprobado, fecha_finalizado, entrega, } = req.body;
                yield PlanificacionModel_1.default.update({
                    flagAprobadoGerente: flagAprobadoGerente,
                    flagAprobadoVp: flagAprobadoVp,
                    flagAsignado: flagAsignado,
                    flagCulminado: flagCulminado,
                    flagDesaprobadoGerente: flagDesaprobadoGerente,
                    flagDesaprobadoVp: flagDesaprobadoVp,
                    flagProceso: flagProceso,
                    fecha_proceso: fecha_proceso,
                    fecha_aprobado: fecha_aprobado,
                    fecha_culminado_auditor: fecha_culminado_auditor,
                    fecha_avalado: fecha_avalado,
                    fecha_finalizado: fecha_finalizado,
                    estado: estado,
                    mount_end: mount_end,
                    entrega: entrega,
                }, {
                    where: {
                        id_planificacion_auditoria: id_planificacion_auditoria,
                    },
                });
                res
                    .status(201)
                    .json({ text: "Planificación actualizado satisfactoriamente" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
                });
            }
        });
    }
    deletePlanifacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_planificacion_auditoria } = req.params;
                yield PlanificacionComentarioModel_1.default.destroy({
                    where: {
                        id_planificacion_auditoria: id_planificacion_auditoria,
                    },
                });
                yield PlanificacionModel_1.default.destroy({
                    where: {
                        id_planificacion_auditoria: id_planificacion_auditoria,
                    },
                });
                res.status(201).json({ text: "Informe eliminado satisfactoriamente" });
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor . Contactar con el administrador ${error}`,
                });
            }
        });
    }
    getPlanificacionComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_planificacion_auditoria } = req.params;
                const planificacionAuditoria = yield PlanificacionComentarioModel_1.default.findAll({
                    include: [{ model: AuditModel_1.default }],
                    where: { id_planificacion_auditoria: id_planificacion_auditoria },
                    order: [[sequelize_1.Sequelize.col("fechaComentario"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res.status(204).json({
                        message: "No fueron encontrados  comentarios para esta planificación",
                    });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getAuditores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auditor = yield AuditModel_1.default.findAll({
                    where: {
                        status: 1,
                    },
                });
                if (auditor.length === 0) {
                    res.status(204).json({ message: "No fueron encontrado Auditores " });
                }
                else {
                    res.status(200).json(auditor);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    order: [
                        [sequelize_1.Sequelize.col("id_gerencia_encargada"), "desc"],
                        [sequelize_1.Sequelize.col("fecha_inicio"), "desc"],
                    ],
                });
                if (planificacionAuditoria.length === 0) {
                    res.status(204).json({ message: "Vacaciones " });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionAsignados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagAsignado: 1,
                        id_auditor_responsable: id,
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionProceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagProceso: 1,
                        id_auditor_responsable: id,
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionCulminado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagCulminado: 1,
                        id_auditor_responsable: id,
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionCulminadoEntregaGerente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id_area;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagCulminado: 1,
                        id_gerencia_encargada: id,
                        [sequelize_1.Op.and]: [
                            { flagAprobadoGerente: { [sequelize_1.Op.or]: [0, null] } },
                            { flagDesaprobadoGerente: { [sequelize_1.Op.or]: [0, null] } },
                        ],
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionAprobadoGerente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_area = req.params.id_area;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagAprobadoGerente: 1,
                        id_gerencia_encargada: id_area,
                        flagAprobadoVp: 0,
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionAprobadoGerenteEntregaVp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_area = req.params.id_area;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagAprobadoGerente: 1,
                        [sequelize_1.Op.and]: [
                            { flagAprobadoVp: { [sequelize_1.Op.or]: [0, null] } },
                            { flagDesaprobadoVp: { [sequelize_1.Op.or]: [0, null] } },
                        ],
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionRechazadoGerente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_area = req.params.id_area;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagDesaprobadoGerente: 1,
                        id_gerencia_encargada: id_area,
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionAprobadoVp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagAprobadoVp: 1,
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionAprobadoVpCondicional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                // Sumar tres días
                const fechaFutura = new Date(fechaActual);
                fechaFutura.setDate(fechaActual.getDate() + 3);
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        [sequelize_1.Op.and]: [
                            { flagAprobadoVp: 1 },
                            { fecha_avalado: { [sequelize_1.Op.lt]: fechaFutura } },
                        ],
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getPlanificacionRechazadoVp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const planificacionAuditoria = yield PlanificacionModel_1.default.findAll({
                    include: [
                        { model: AuditModel_1.default, as: "auditorResponsable" },
                        { model: AuditModel_1.default, as: "auditorSecundario" },
                        { model: AuditModel_1.default, as: "auditorTerciario" },
                        {
                            model: SubProcesoModel_1.default,
                            include: [
                                {
                                    model: Proceso_1.default,
                                    include: [
                                        {
                                            model: MacroprocesoModel_1.default,
                                        },
                                        { model: TipoProcesosModel_1.default },
                                    ],
                                },
                            ],
                        },
                    ],
                    where: {
                        flagDesaprobadoVp: 1,
                    },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "desc"]],
                });
                if (planificacionAuditoria.length === 0) {
                    res
                        .status(204)
                        .json({ message: "No encontrados Auditorias Asignadas" });
                }
                else {
                    res.status(200).json(planificacionAuditoria);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getGroupPlanificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const subresults = yield PlanificacionModel_1.default.findAll({
                    attributes: [
                        "mount_end",
                        "id_gerencia_encargada",
                        [
                            sequelize_1.Sequelize.fn("SUM", sequelize_1.Sequelize.col("cantidad_subprocesos")),
                            "total_subprocesos",
                        ],
                        [
                            sequelize_1.Sequelize.literal(`(
                  SELECT SUM(cantidad_subprocesos)
                  FROM planificacion_auditoria p
                  WHERE p.mount_end <= \`planificacion_auditoria\`.\`mount_end\`
                    AND p.id_gerencia_encargada = \`planificacion_auditoria\`.\`id_gerencia_encargada\`
                )`),
                            "total_subprocesos_acumulado",
                        ],
                    ],
                    group: ["mount_end", "id_gerencia_encargada"],
                });
                const total = yield PlanificacionModel_1.default.findAll({
                    attributes: [
                        [
                            sequelize_1.Sequelize.fn("SUM", sequelize_1.Sequelize.col("cantidad_subprocesos")),
                            "total_subprocesos",
                        ],
                        [
                            sequelize_1.Sequelize.literal(`(
                  SELECT SUM(cantidad_subprocesos)
                  FROM planificacion_auditoria p
                  WHERE p.mount_end <= \`planificacion_auditoria\`.\`mount_end\`
              
                )`),
                            "total_subprocesos_acumulado",
                        ],
                    ],
                });
                const results = {
                    total,
                    subresults,
                };
                const planificacion = yield PlanificacionModel_1.default.findAll({
                    where: { mount_end: 6 },
                    order: [[sequelize_1.Sequelize.col("fecha_inicio"), "asc"]],
                });
                if (subresults.length === 0) {
                    res.status(204).json({ message: "Vacaciones " });
                }
                else {
                    res.status(200).json(results);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
}
exports.planificacionController = new PlanificacionController();
