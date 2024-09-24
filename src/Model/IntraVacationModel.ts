import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize, sequelize } from "../database";
import Auditor from "./AuditModel";
import EmpleadosModel from "./EmpleadoModel";

const IntraVacaciones = sequelize.define('INTRA_VACACIONES', {
    id_solicitud: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: EmpleadosModel,
        key: "id_empleado",
      },
    },
    cedula: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_desde: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecha_hasta: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecha_solicitud: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    saldo_actual: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    saldo_anterior: {
      type: DataTypes.INTEGER,allowNull: true,
    },
    SALDO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ci_contador: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    fecha_reintegro: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });




  IntraVacaciones.belongsTo(EmpleadosModel, {
    foreignKey: "id_empleado",
  });
  

export default IntraVacaciones;
