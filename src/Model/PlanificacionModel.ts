import { auditSequelize } from "../database";
import { DataTypes, Sequelize } from "sequelize";
import Auditor from "./AuditModel";
import Subproceso from "./SubProcesoModel";
const PlanificacionAuditoriaModel = auditSequelize.define(
  "planificacion_auditoria",
  {
    id_planificacion_auditoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad_subprocesos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(40),
    },
    entrega: {
      type: DataTypes.STRING(200),
    },
    fecha_culminacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    flagAS400: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagDA: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagFULL: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagIST73: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagIST77: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagISTCLEAR: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagNAIGUATA: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagSAP: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flagAsignado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    flagProceso: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    flagCulminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    flagAprobadoGerente: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flagDesaprobadoGerente: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flagAprobadoVp: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flagDesaprobadoVp: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fecha_culminado_auditor: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_finalizado: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_aprobado: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_avalado: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_proceso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_auditor_responsable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Auditor, // Nombre de la tabla referenciada
        key: "id_auditor_responsable",
      },
    },
    id_auditor_secundario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Auditor, // Nombre de la tabla referenciada
        key: "id_auditor_responsable",
      },
    },
    id_auditor_terciario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Auditor, // Nombre de la tabla referenciada
        key: "id_auditor_responsable",
      },
    },
    id_gerencia_encargada: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_subproceso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subproceso, // Nombre de la tabla referenciada
        key: "id_subproceso",
      },
    },
    mount_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

PlanificacionAuditoriaModel.belongsTo(Auditor, {
  as: "auditorResponsable",
  foreignKey: "id_auditor_responsable",
});
PlanificacionAuditoriaModel.belongsTo(Auditor, {
  as: "auditorSecundario",
  foreignKey: "id_auditor_secundario",
});
PlanificacionAuditoriaModel.belongsTo(Auditor, {
  as: "auditorTerciario",
  foreignKey: "id_auditor_terciario",
});

PlanificacionAuditoriaModel.belongsTo(Subproceso, {
  foreignKey: "id_subproceso",
});

export default PlanificacionAuditoriaModel;
