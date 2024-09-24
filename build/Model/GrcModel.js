"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const VPModel_1 = __importDefault(require("./VPModel"));
const GrcModel = database_1.sequelize.define('INTRA_GERENCIA', {
    id_gerencia: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_gerencia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_vp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: VPModel_1.default,
            key: "id_vp",
        },
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    // Agrega el parámetro pluralize
    freezeTableName: true,
});
GrcModel.belongsTo(VPModel_1.default, {
    foreignKey: "id_vp",
});
exports.default = GrcModel;
