"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
// Define model
const IntraSupervisor = database_1.sequelize.define('INTRA_SUPERVISOR', {
    id_supervisor: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ci_supervisor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_sup1: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    nombre_sup2: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    apellido_sup1: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    apellido_sup2: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    telefono_extension: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    id_cargo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'INTRA_CARGO',
            key: 'id_cargo',
        },
    },
    id_dpto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'INTRA_DPTO',
            key: 'id_dpto',
        },
    },
    id_gerencia: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'INTRA_GERENCIA',
            key: 'id_gerencia',
        },
    },
    id_vp: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'INTRA_VP',
            key: 'id_vp',
        },
    },
    id_vpe: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'INTRA_VPE',
            key: 'id_vpe',
        },
    },
    id_pe: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'INTRA_PE',
            key: 'id_pe',
        },
    },
    id_status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: 'INTRA_STATUS_SUP',
            key: 'id_status',
        },
    },
}, {
    // Define table options
    tableName: 'INTRA_SUPERVISOR',
    timestamps: false, // disable timestamps for this model
});
exports.default = IntraSupervisor;
// Export model
