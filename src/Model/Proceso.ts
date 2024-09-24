import { DataTypes } from "sequelize";
import { auditSequelize } from "../database";
import Macroproceso from "./MacroprocesoModel";
import TipoProceso from "./TipoProcesosModel";

const Proceso = auditSequelize.define('proceso', {
    id_proceso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_proceso: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true // Enforces unique process names
    },
    id_tipo_proceso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:TipoProceso,
        key:'id_tipo_proceso'
      }
    },
    id_macroproceso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:Macroproceso,
        key:'id_macroproceso'
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false // Disable automatic timestamp columns (createdAt, updatedAt)
  });

  Proceso.belongsTo(TipoProceso, { foreignKey: "id_tipo_proceso" })
  Proceso.belongsTo(Macroproceso, { foreignKey: "id_macroproceso" })
  export default Proceso;