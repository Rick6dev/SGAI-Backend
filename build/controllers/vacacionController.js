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
exports.vacationController = void 0;
const VacacionModel_1 = __importDefault(require("../Model/VacacionModel"));
const database_1 = require("../database");
const AuditModel_1 = __importDefault(require("../Model/AuditModel"));
const sequelize_1 = require("sequelize");
const IntraVacationModel_1 = __importDefault(require("../Model/IntraVacationModel"));
const EmpleadoModel_1 = __importDefault(require("../Model/EmpleadoModel"));
const crearVacation_1 = require("../utils/crearVacation");
class VacationController {
    getVacation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const vacaciones = yield VacacionModel_1.default.findAll({
                    // where: { status: true },
                    attributes: [
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_inicio'), '%Y-%m-%d'), 'fecha_inicio'],
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_reingreso'), '%Y-%m-%d'), 'fecha_reingreso'],
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_culminacion'), '%Y-%m-%d'), 'fecha_culminacion'],
                        'id_vacacion', 'year', 'id_auditor_responsable'
                    ],
                    where: { year: añoActual },
                    include: [
                        {
                            model: AuditModel_1.default
                        }
                    ]
                });
                if (vacaciones.length === 0) {
                    res
                        .status(204)
                        .json({ message: "Vacaciones " });
                }
                else {
                    res.status(200).json(vacaciones);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador ${error} `,
                });
            }
        });
    }
    getOneVacation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                console.log(añoActual);
                console.log(req.params);
                const id = req.params.id;
                const vacaciones = yield VacacionModel_1.default.findAll({
                    attributes: [
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_inicio'), '%Y-%m-%d'), 'fecha_inicio'],
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_reingreso'), '%Y-%m-%d'), 'fecha_reingreso'],
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_culminacion'), '%Y-%m-%d'), 'fecha_culminacion'],
                        'id_vacacion', 'year', 'id_auditor_responsable'
                    ],
                    where: { id_auditor_responsable: id, year: añoActual },
                    include: [
                        {
                            model: AuditModel_1.default
                        }
                    ]
                });
                if (vacaciones.length === 0) {
                    res
                        .status(204)
                        .json({ message: "Vacaciones no encontradas " });
                }
                else {
                    res.status(200).json(vacaciones);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    getIntraVacation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const ci_empleado = req.params.ci_empleado;
                const id = req.params.id;
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const intraVacaciones = yield IntraVacationModel_1.default.findAll({
                    where: { cedula: ci_empleado,
                        fecha_desde: {
                            [sequelize_1.Op.like]: `${añoActual}%`
                        } },
                    include: [
                        {
                            model: EmpleadoModel_1.default
                        }
                    ]
                });
                const vacaciones = yield VacacionModel_1.default.findAll({
                    attributes: [
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_inicio'), '%Y-%m-%d'), 'fecha_inicio'],
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_reingreso'), '%Y-%m-%d'), 'fecha_reingreso'],
                        [(0, sequelize_1.fn)('DATE_FORMAT', database_1.sequelize.col('fecha_culminacion'), '%Y-%m-%d'), 'fecha_culminacion'],
                        'id_vacacion', 'year', 'id_auditor_responsable'
                    ],
                    where: { id_auditor_responsable: id, year: añoActual },
                    include: [
                        {
                            model: AuditModel_1.default
                        }
                    ]
                });
                if (intraVacaciones.length === 0) {
                    vacaciones.forEach((vacacion) => {
                        (0, crearVacation_1.deleteVacacion)(vacacion);
                    });
                    res
                        .status(204)
                        .json({ message: "Vacaciones no encontradas " });
                }
                else {
                    if (vacaciones.length == 0) {
                        intraVacaciones.forEach((solicitud) => {
                            (0, crearVacation_1.crearVacacion)(solicitud, id);
                        });
                    }
                    else {
                        vacaciones.forEach((vacacion) => {
                            (0, crearVacation_1.deleteVacacion)(vacacion);
                        });
                        intraVacaciones.forEach((solicitud) => {
                            (0, crearVacation_1.crearVacacion)(solicitud, id);
                        });
                    }
                    res.status(200).json(intraVacaciones);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    countVacation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                console.log(añoActual);
                const id = req.params.id;
                const existeRiesgo = yield VacacionModel_1.default.count({
                    where: {
                        id_auditor_responsable: id,
                        year: añoActual,
                    },
                });
                if (existeRiesgo > 1) {
                    res.status(200).json({
                        message: "El auditor alcanzo el limite de periodos de Vacaciones ",
                        flagVacation: true,
                        numeroVacaciones: existeRiesgo
                    });
                }
                else {
                    res
                        .status(200)
                        .json({ flagVacation: false, numeroVacaciones: existeRiesgo });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    getFilterVacation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vacacionesFiltradas = [];
                const uniqueAuditorIDs = new Set();
                const fInicio = req.params.fechaInicio;
                const [year, month, day] = fInicio.split("-");
                const fechaNewInicio = `${year}-${month}-${day - 1}`;
                const fculminacion = req.params.fechaCulminacion;
                console.log(fInicio);
                const fechaActual = new Date();
                const añoActual = fechaActual.getFullYear();
                const vacaciones = yield VacacionModel_1.default.findAll({
                    include: [
                        {
                            model: AuditModel_1.default
                        }
                    ],
                    where: {
                        fecha_inicio: {
                            [sequelize_1.Op.notBetween]: [fechaNewInicio, fculminacion]
                        },
                        fecha_culminacion: {
                            [sequelize_1.Op.notBetween]: [fechaNewInicio, fculminacion]
                        },
                        year: añoActual
                    }
                });
                const auditorVacaciones = yield VacacionModel_1.default.findAll({
                    where: {
                        fecha_inicio: {
                            [sequelize_1.Op.between]: [fechaNewInicio, fculminacion]
                        },
                        year: añoActual
                    }
                });
                if (vacaciones.length === 0) {
                    res
                        .status(204)
                        .json({ message: "Vacaciones no encontradas " });
                }
                else {
                    if (auditorVacaciones.length === 0) {
                        vacacionesFiltradas = vacaciones;
                    }
                    else {
                        auditorVacaciones.forEach((solicitud) => {
                            vacacionesFiltradas = vacaciones.filter(function (vacacion) {
                                return vacacion.id_auditor_responsable !== solicitud.id_auditor_responsable;
                            });
                        });
                    }
                    // Filtrar la matriz de datos y agregar IDs de auditor únicos al conjunto
                    const filteredData = vacacionesFiltradas.filter((item) => {
                        if (!uniqueAuditorIDs.has(item.id_auditor_responsable)) {
                            uniqueAuditorIDs.add(item.id_auditor_responsable);
                            return true;
                        }
                        return false;
                    });
                    res.status(200).json(filteredData);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador `,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_vacacion, fecha_inicio, fecha_reintegro, fecha_culminacion, user_id, year } = req.body;
                yield VacacionModel_1.default.create({
                    id_vacacion: id_vacacion,
                    fecha_inicio: fecha_inicio,
                    fecha_reingreso: fecha_reintegro,
                    fecha_culminacion: fecha_culminacion,
                    id_auditor_responsable: user_id,
                    year: year
                });
                res.status(201).json({ text: "Registro de  vaciones  creadas" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id_vacacion, fecha_inicio, fecha_reintegro, fecha_culminacion, user_id, year } = req.body;
                yield VacacionModel_1.default.update({
                    fecha_inicio: fecha_inicio,
                    fecha_reingreso: fecha_reintegro,
                    fecha_culminacion: fecha_culminacion,
                    id_auditor_responsable: user_id,
                    year: year
                }, {
                    where: {
                        id_vacacion: id_vacacion
                    },
                });
                res.status(201).json({ text: "Vacacion aprobada correctamente" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `${error}`,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield VacacionModel_1.default.destroy({
                    where: { id_vacacion: id },
                });
                res.status(204).json({ message: "Hallazgo Eliminado Correctamente" });
            }
            catch (error) {
                console.error(`Error creating hallazgo: ${error}`);
                res.status(500).json({
                    message: `Se ha producido un error en el servidor .Contactar con el administrador`,
                });
            }
        });
    }
}
exports.vacationController = new VacationController();
