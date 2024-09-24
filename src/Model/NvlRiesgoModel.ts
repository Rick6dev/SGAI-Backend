

import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize } from "../database";

const NvlRiesgoModel = auditSequelize.define("nivel_riesgo", {
    id_nivel_riesgo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_nivel_riesgo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
}, {
  freezeTableName: true,
  timestamps: false,
});



export default NvlRiesgoModel;