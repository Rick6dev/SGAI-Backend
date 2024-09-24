import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize } from "../database";

const Auditor = auditSequelize.define(
  "usuario",
  {
    id_auditor_responsable: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    ci_empleado: DataTypes.INTEGER,
    mail: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Auditor;
