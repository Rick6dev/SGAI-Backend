"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const TipoProceso = database_1.auditSequelize.define('tipo_proceso', {
    id_tipo_proceso: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_tipo_proceso: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false // Disable automatic timestamp columns (createdAt, updatedAt)
});
exports.default = TipoProceso;
