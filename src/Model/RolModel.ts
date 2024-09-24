import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize } from "../database";

const Rol = auditSequelize.define('roles', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  } , {
        freezeTableName: true,
  timestamps: false,
    });



export default Rol;