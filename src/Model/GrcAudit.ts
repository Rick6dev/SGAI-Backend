import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize, sequelize } from "../database";
import VpModel from "./VPModel";

const GerenciaAuditoria = auditSequelize.define(
  "gerencia_auditoria",
  {
    id_gerencia_encargada: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gerencia_encargada: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default GerenciaAuditoria;
