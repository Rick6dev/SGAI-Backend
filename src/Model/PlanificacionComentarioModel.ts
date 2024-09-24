

import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize } from "../database";
import Auditor from "./AuditModel";
import PlanificacionAuditoriaModel from "./PlanificacionModel";

const PlanificacionComentario = auditSequelize.define("comentario_estatus", {
    id_comentario_estatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comentario: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      fechaComentario: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Para establecer la fecha actual
      },
      id_planificacion_auditoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: PlanificacionAuditoriaModel, // Nombre de la tabla referenciada
          key: 'id_planificacion_auditoria',
        },
      },
      id_auditor_responsable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Auditor, // Nombre de la tabla referenciada
          key: 'id_auditor_responsable',
        },
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
}, {
  freezeTableName: true,
  timestamps: false,
});


PlanificacionComentario.belongsTo(Auditor, {
  foreignKey: "id_auditor_responsable",
  onDelete: "CASCADE",
});
export default PlanificacionComentario;