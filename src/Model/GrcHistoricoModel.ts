import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize, sequelize } from "../database";
import VpModel from "./VPModel";

const GerenciaResponsableHistorico = auditSequelize.define(
  "gerencia_responsable_historico",
  {
    id_gerencia_historico: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gerencia_historico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default GerenciaResponsableHistorico;
