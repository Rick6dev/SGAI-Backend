"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const Rol = database_1.auditSequelize.define('roles', {
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = Rol;
