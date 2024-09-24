"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const AuditModel_1 = __importDefault(require("./AuditModel"));
const Vacacion = database_1.auditSequelize.define("vacacion", {
    id_vacacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_auditor_responsable: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: AuditModel_1.default,
            key: "id_auditor_responsable"
        },
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_culminacion: {
        type: sequelize_1.DataTypes.DATE
    },
    fecha_reingreso: {
        type: sequelize_1.DataTypes.DATE
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});
Vacacion.belongsTo(AuditModel_1.default, {
    foreignKey: "id_auditor_responsable"
});
exports.default = Vacacion;
