"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const MacroprocesoModel_1 = __importDefault(require("./MacroprocesoModel"));
const TipoProcesosModel_1 = __importDefault(require("./TipoProcesosModel"));
const Proceso = database_1.auditSequelize.define('proceso', {
    id_proceso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_proceso: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
        unique: true // Enforces unique process names
    },
    id_tipo_proceso: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoProcesosModel_1.default,
            key: 'id_tipo_proceso'
        }
    },
    id_macroproceso: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MacroprocesoModel_1.default,
            key: 'id_macroproceso'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false // Disable automatic timestamp columns (createdAt, updatedAt)
});
Proceso.belongsTo(TipoProcesosModel_1.default, { foreignKey: "id_tipo_proceso" });
Proceso.belongsTo(MacroprocesoModel_1.default, { foreignKey: "id_macroproceso" });
exports.default = Proceso;
