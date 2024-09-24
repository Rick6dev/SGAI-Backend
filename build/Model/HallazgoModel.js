"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
const RsgModel_1 = __importDefault(require("./RsgModel"));
const NvlRiesgoModel_1 = __importDefault(require("./NvlRiesgoModel"));
const InformeAuditoria_1 = __importDefault(require("./InformeAuditoria"));
const GrcModel_1 = __importDefault(require("./GrcModel"));
const AuditModel_1 = __importDefault(require("./AuditModel"));
const GrcHistoricoModel_1 = __importDefault(require("./GrcHistoricoModel"));
const Hallazgo = database_1.auditSequelize.define("hallazgo", {
    // Atributos del modelo
    id_hallazgo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_gerencia_encargada: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    hallazgo_reportado: {
        type: sequelize_1.DataTypes.STRING(1000),
    },
    recomendacion: {
        type: sequelize_1.DataTypes.STRING(600),
    },
    accion_correctiva: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    fecha_compromiso: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_cierre: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    created_year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estatus_Plan_Accion: {
        type: sequelize_1.DataTypes.STRING(10),
    },
    cerrado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    aprobado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    id_informe_auditoria: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: InformeAuditoria_1.default,
            key: "id_informe_auditoria",
        },
    },
    id_auditor_responsable: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: AuditModel_1.default,
            key: "id_auditor_responsable",
        },
    },
    id_nivel_riesgo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: NvlRiesgoModel_1.default,
            key: "id_nivel_riesgo",
        },
    },
    id_riesgo_asociado: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: RsgModel_1.default,
            key: "id_riesgo_asociado",
        },
    },
    id_gerencia: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: GrcModel_1.default,
            key: "id_riesgo_asociado",
        },
    },
    id_gerencia_historico: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: GrcModel_1.default,
            key: "id_gerencia_historico",
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
    // await HallazgoModel.sync({ ignore: true });
});
// Establecer la relación entre los modelos
Hallazgo.belongsTo(InformeAuditoria_1.default, {
    foreignKey: "id_informe_auditoria",
    onDelete: "CASCADE",
});
Hallazgo.belongsTo(GrcHistoricoModel_1.default, {
    foreignKey: "id_gerencia_historico",
    onDelete: "CASCADE",
});
Hallazgo.belongsTo(AuditModel_1.default, {
    foreignKey: "id_auditor_responsable",
});
Hallazgo.belongsTo(NvlRiesgoModel_1.default, {
    foreignKey: "id_nivel_riesgo",
    onDelete: "CASCADE",
});
Hallazgo.belongsTo(RsgModel_1.default, {
    foreignKey: "id_riesgo_asociado",
    onDelete: "CASCADE",
});
exports.default = Hallazgo;
