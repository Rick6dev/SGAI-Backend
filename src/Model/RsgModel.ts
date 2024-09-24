import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize } from "../database";

const RsgModel = auditSequelize.define("riesgo_asociado", {
    id_riesgo_asociado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_riesgo_asociado: DataTypes.STRING,
    },
    {
        freezeTableName: true,
  timestamps: false,
    },);



export default RsgModel;