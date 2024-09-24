"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
const HallazgoModel_1 = __importDefault(require("./HallazgoModel"));
const AuditModel_1 = __importDefault(require("./AuditModel"));
const HallazgoSeguimiento = database_1.auditSequelize.define("hallazgo_seguimiento", {
    id_comentario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha_comentario: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    id_auditor_responsable: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: AuditModel_1.default,
            key: "id_auditor_responsable",
        },
    },
    id_hallazgo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: HallazgoModel_1.default,
            key: "id_hallazgo",
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
    // await HallazgoModel.sync({ ignore: true });
});
HallazgoModel_1.default.belongsTo(AuditModel_1.default, {
    foreignKey: "id_auditor_responsable",
    onDelete: "CASCADE",
});
// Establecer la relación entre los modelos
HallazgoSeguimiento.belongsTo(HallazgoModel_1.default, {
    foreignKey: "id_hallazgo",
    onDelete: "CASCADE",
});
exports.default = HallazgoSeguimiento;
