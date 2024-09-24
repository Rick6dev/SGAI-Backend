"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const Proceso_1 = __importDefault(require("./Proceso"));
const Subproceso = database_1.auditSequelize.define('subproceso', {
    id_subproceso: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_subproceso: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
        unique: true, // Optional: Unique constraint for name
    },
    id_proceso: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proceso_1.default,
            key: 'id_proceso'
        }
    },
}, {
    freezeTableName: true,
    timestamps: false // Disable automatic timestamp columns (createdAt, updatedAt)
});
// Define association (assuming a 'Proceso' model exists)
Subproceso.belongsTo(Proceso_1.default, { foreignKey: 'id_proceso' });
exports.default = Subproceso;
