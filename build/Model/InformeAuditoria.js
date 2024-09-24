"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const TipoAuditoriaModel_1 = __importDefault(require("./TipoAuditoriaModel"));
const InformeAuditoria = database_1.auditSequelize.define("informe_auditoria", {
    id_informe_auditoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_gerencia_encargada: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    created_year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_informe: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    cod_informe: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    trimestre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    id_tipo_auditoria: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: TipoAuditoriaModel_1.default,
            key: 'id_tipo_auditoria',
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
// Establecer la relación entre los modelos
InformeAuditoria.belongsTo(TipoAuditoriaModel_1.default, {
    foreignKey: "id_tipo_auditoria", // Clave foránea en InformeAuditoria
});
exports.default = InformeAuditoria;
