"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const VPEModel_1 = __importDefault(require("./VPEModel"));
const VpModel = database_1.sequelize.define("INTRA_VP", {
    id_vp: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: VPEModel_1.default,
            key: "id_vpe",
        },
    },
    nombre_vp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    freezeTableName: true,
});
VpModel.belongsTo(VPEModel_1.default, { foreignKey: "id_vpe" }); // Corregido referencia a VpeModel
// VpModel.hasOne(GrcModel, { foreignKey: "id_vp" }); // Corregida dirección de la asociación
exports.default = VpModel;
