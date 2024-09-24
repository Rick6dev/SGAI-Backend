import { auditSequelize, sequelize } from "../database";

import { Model, DataTypes, Sequelize } from "sequelize";
import RsgModel from "./RsgModel";
import NvlRiesgoModel from "./NvlRiesgoModel";
import InformeAuditoria from "./InformeAuditoria";
import GrcModel from "./GrcModel";
import Auditor from "./AuditModel";
import GerenciaResponsableHistorico from "./GrcHistoricoModel";

const Hallazgo = auditSequelize.define(
  "hallazgo",
  {
    // Atributos del modelo
    id_hallazgo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_gerencia_encargada: {
      type: DataTypes.INTEGER,
    },
    hallazgo_reportado: {
      type: DataTypes.STRING(1000),
    },
    recomendacion: {
      type: DataTypes.STRING(600),
    },
    accion_correctiva: {
      type: DataTypes.STRING(500),
    },

    fecha_compromiso: {
      type: DataTypes.DATE,
    },
    fecha_cierre: {
      type: DataTypes.DATE,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
    },
    created_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estatus_Plan_Accion: {
      type: DataTypes.STRING(10),
    },
    cerrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    id_informe_auditoria: {
      type: DataTypes.INTEGER,
      references: {
        model: InformeAuditoria,
        key: "id_informe_auditoria",
      },
    },
    id_auditor_responsable: {
      type: DataTypes.INTEGER,
      references: {
        model: Auditor,
        key: "id_auditor_responsable",
      },
    },
    id_nivel_riesgo: {
      type: DataTypes.INTEGER,
      references: {
        model: NvlRiesgoModel,
        key: "id_nivel_riesgo",
      },
    },
    id_riesgo_asociado: {
      type: DataTypes.INTEGER,
      references: {
        model: RsgModel,
        key: "id_riesgo_asociado",
      },
    },
    id_gerencia: {
      type: DataTypes.INTEGER,
      references: {
        model: GrcModel,
        key: "id_riesgo_asociado",
      },
    },
    id_gerencia_historico: {
      type: DataTypes.INTEGER,
      references: {
        model: GrcModel,
        key: "id_gerencia_historico",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    // await HallazgoModel.sync({ ignore: true });
  }
);

// Establecer la relación entre los modelos
Hallazgo.belongsTo(InformeAuditoria, {
  foreignKey: "id_informe_auditoria",
  onDelete: "CASCADE",
});
Hallazgo.belongsTo(GerenciaResponsableHistorico, {
  foreignKey: "id_gerencia_historico",
  onDelete: "CASCADE",
});

Hallazgo.belongsTo(Auditor, {
  foreignKey: "id_auditor_responsable",
});

Hallazgo.belongsTo(NvlRiesgoModel, {
  foreignKey: "id_nivel_riesgo",
  onDelete: "CASCADE",
});

Hallazgo.belongsTo(RsgModel, {
  foreignKey: "id_riesgo_asociado",
  onDelete: "CASCADE",
});

export default Hallazgo;
