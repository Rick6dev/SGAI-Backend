

import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize } from "../database";

const TipoAuditoria = auditSequelize.define("tipo_auditoria", {
  id_tipo_auditoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_tipo_auditoria: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  cod_tipo_auditoria: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});



export default TipoAuditoria;