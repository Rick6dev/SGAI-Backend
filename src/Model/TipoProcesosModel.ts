import { DataTypes } from "sequelize";
import { auditSequelize } from "../database";

const TipoProceso = auditSequelize.define('tipo_proceso', {
    id_tipo_proceso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_tipo_proceso: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    
  },{
    freezeTableName: true,
    timestamps: false // Disable automatic timestamp columns (createdAt, updatedAt)
  });

  export default TipoProceso;