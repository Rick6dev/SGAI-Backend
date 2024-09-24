"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const EmpleadoModel_1 = __importDefault(require("./EmpleadoModel"));
const IntraVacaciones = database_1.sequelize.define('INTRA_VACACIONES', {
    id_solicitud: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_empleado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: EmpleadoModel_1.default,
            key: "id_empleado",
        },
    },
    cedula: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    fecha_desde: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    fecha_hasta: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    fecha_solicitud: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    saldo_actual: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    saldo_anterior: {
        type: sequelize_1.DataTypes.INTEGER, allowNull: true,
    },
    SALDO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    ci_contador: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
        unique: true,
    },
    fecha_reintegro: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
IntraVacaciones.belongsTo(EmpleadoModel_1.default, {
    foreignKey: "id_empleado",
});
exports.default = IntraVacaciones;
