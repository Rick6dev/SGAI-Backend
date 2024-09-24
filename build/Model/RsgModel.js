"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const RsgModel = database_1.auditSequelize.define("riesgo_asociado", {
    id_riesgo_asociado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_riesgo_asociado: sequelize_1.DataTypes.STRING,
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = RsgModel;
