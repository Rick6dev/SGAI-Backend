"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const Auditor = database_1.auditSequelize.define("usuario", {
    id_auditor_responsable: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: sequelize_1.DataTypes.STRING,
    apellido: sequelize_1.DataTypes.STRING,
    ci_empleado: sequelize_1.DataTypes.INTEGER,
    mail: sequelize_1.DataTypes.STRING,
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = Auditor;
