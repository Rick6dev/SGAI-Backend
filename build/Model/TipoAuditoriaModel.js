"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const TipoAuditoria = database_1.auditSequelize.define("tipo_auditoria", {
    id_tipo_auditoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_tipo_auditoria: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    cod_tipo_auditoria: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = TipoAuditoria;
