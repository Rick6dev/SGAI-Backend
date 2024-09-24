import { DataTypes } from "sequelize";
import { auditSequelize } from "../database";
import Proceso from "./Proceso";

const Subproceso = auditSequelize.define('subproceso', {
    id_subproceso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_subproceso: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true, // Optional: Unique constraint for name
    },
    id_proceso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:Proceso,
        key:'id_proceso'
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false // Disable automatic timestamp columns (createdAt, updatedAt)
  });
  
  // Define association (assuming a 'Proceso' model exists)
  Subproceso.belongsTo(Proceso, { foreignKey: 'id_proceso' });

  export default Subproceso;