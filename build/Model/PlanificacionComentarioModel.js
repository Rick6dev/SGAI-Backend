"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const AuditModel_1 = __importDefault(require("./AuditModel"));
const PlanificacionModel_1 = __importDefault(require("./PlanificacionModel"));
const PlanificacionComentario = database_1.auditSequelize.define("comentario_estatus", {
    id_comentario_estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    fechaComentario: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW, // Para establecer la fecha actual
    },
    id_planificacion_auditoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlanificacionModel_1.default, // Nombre de la tabla referenciada
            key: 'id_planificacion_auditoria',
        },
    },
    id_auditor_responsable: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AuditModel_1.default, // Nombre de la tabla referenciada
            key: 'id_auditor_responsable',
        },
    },
    role: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
PlanificacionComentario.belongsTo(AuditModel_1.default, {
    foreignKey: "id_auditor_responsable",
    onDelete: "CASCADE",
});
exports.default = PlanificacionComentario;
