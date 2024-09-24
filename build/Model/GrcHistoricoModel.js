"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const GerenciaResponsableHistorico = database_1.auditSequelize.define("gerencia_responsable_historico", {
    id_gerencia_historico: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gerencia_historico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});
exports.default = GerenciaResponsableHistorico;
