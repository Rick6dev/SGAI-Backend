"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const EmpleadosModel = database_1.sequelize.define("INTRA_EMPLEADOS", {
    id_empleado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre1: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    nombre2: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    apellido1: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    apellido2: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    ci_empleado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    id_cargo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "INTRA_CARGO",
            key: "id_cargo",
        },
    },
    id_sup: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "INTRA_SUPERVISOR",
            key: "id_supervisor",
        },
    },
    id_sucursal: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: "RECI_SUCURSAL",
            key: "ID_SUCURSAL",
        },
    },
    id_area: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "gadi_areas",
            key: "id_area",
        },
    },
    id_status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: "INTRA_STATUS_SUP",
            key: "id_status",
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = EmpleadosModel;
