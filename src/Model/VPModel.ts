import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database";
import VpeModel from "./VPEModel";
import GrcModel from "./GrcModel";

const VpModel = sequelize.define(
  "INTRA_VP",
  {
    id_vp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      references: {
        model: VpeModel,
        key: "id_vpe",
      },
    },
    nombre_vp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
  }
);

VpModel.belongsTo(VpeModel, { foreignKey: "id_vpe" }); // Corregido referencia a VpeModel

// VpModel.hasOne(GrcModel, { foreignKey: "id_vp" }); // Corregida dirección de la asociación

export default VpModel;