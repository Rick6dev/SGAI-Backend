"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
// Replace 'your_database_name' with the actual name of your database
const Macroproceso = database_1.auditSequelize.define('macroproceso', {
    id_macroproceso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_macroproceso: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Macroproceso;
