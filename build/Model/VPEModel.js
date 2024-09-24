"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const VpeModel = database_1.sequelize.define("INTRA_VPE", {
    id_vpe: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_vpe: sequelize_1.DataTypes.STRING,
    status: sequelize_1.DataTypes.BOOLEAN,
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = VpeModel;
