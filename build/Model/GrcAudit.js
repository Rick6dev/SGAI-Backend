"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const GerenciaAuditoria = database_1.auditSequelize.define("gerencia_auditoria", {
    id_gerencia_encargada: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gerencia_encargada: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = GerenciaAuditoria;
