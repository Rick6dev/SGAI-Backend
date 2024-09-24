import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database";

const EmpleadosModel = sequelize.define(
  "INTRA_EMPLEADOS",
  {
    id_empleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nombre2: {
      type: DataTypes.STRING(255),
    },
    apellido1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    apellido2: {
      type: DataTypes.STRING(255),
    },
    ci_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_cargo: {
      type: DataTypes.INTEGER,
      references: {
        model: "INTRA_CARGO",
        key: "id_cargo",
      },
    },
    id_sup: {
      type: DataTypes.INTEGER,
      references: {
        model: "INTRA_SUPERVISOR",
        key: "id_supervisor",
      },
    },
 
    id_sucursal: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: "RECI_SUCURSAL",
        key: "ID_SUCURSAL",
      },
    },
    id_area: {
      type: DataTypes.INTEGER,
      references: {
        model: "gadi_areas",
        key: "id_area",
      },
    },
    id_status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: "INTRA_STATUS_SUP",
        key: "id_status",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default EmpleadosModel;
