"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
const AuditModel_1 = __importDefault(require("./AuditModel"));
const SubProcesoModel_1 = __importDefault(require("./SubProcesoModel"));
const PlanificacionAuditoriaModel = database_1.auditSequelize.define("planificacion_auditoria", {
    id_planificacion_auditoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad_subprocesos: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    created_year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(40),
    },
    entrega: {
        type: sequelize_1.DataTypes.STRING(200),
    },
    fecha_culminacion: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    flagAS400: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagDA: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagFULL: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagIST73: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagIST77: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagISTCLEAR: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagNAIGUATA: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagSAP: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    flagAsignado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    flagProceso: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    flagCulminado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    flagAprobadoGerente: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    flagDesaprobadoGerente: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    flagAprobadoVp: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    flagDesaprobadoVp: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    fecha_culminado_auditor: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    fecha_finalizado: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    fecha_aprobado: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    fecha_avalado: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    fecha_proceso: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    id_auditor_responsable: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AuditModel_1.default, // Nombre de la tabla referenciada
            key: "id_auditor_responsable",
        },
    },
    id_auditor_secundario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: AuditModel_1.default, // Nombre de la tabla referenciada
            key: "id_auditor_responsable",
        },
    },
    id_auditor_terciario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: AuditModel_1.default, // Nombre de la tabla referenciada
            key: "id_auditor_responsable",
        },
    },
    id_gerencia_encargada: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    id_subproceso: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SubProcesoModel_1.default, // Nombre de la tabla referenciada
            key: "id_subproceso",
        },
    },
    mount_end: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
PlanificacionAuditoriaModel.belongsTo(AuditModel_1.default, {
    as: "auditorResponsable",
    foreignKey: "id_auditor_responsable",
});
PlanificacionAuditoriaModel.belongsTo(AuditModel_1.default, {
    as: "auditorSecundario",
    foreignKey: "id_auditor_secundario",
});
PlanificacionAuditoriaModel.belongsTo(AuditModel_1.default, {
    as: "auditorTerciario",
    foreignKey: "id_auditor_terciario",
});
PlanificacionAuditoriaModel.belongsTo(SubProcesoModel_1.default, {
    foreignKey: "id_subproceso",
});
exports.default = PlanificacionAuditoriaModel;
