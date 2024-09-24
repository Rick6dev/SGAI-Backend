const Sequelize = require('sequelize');
import { DataTypes } from "sequelize";
import { auditSequelize } from "../database";
// Replace 'your_database_name' with the actual name of your database


const Macroproceso = auditSequelize.define('macroproceso', {
  id_macroproceso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_macroproceso: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false 
});

export default Macroproceso;