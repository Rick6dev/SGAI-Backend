import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database";


const VpeModel = sequelize.define("INTRA_VPE", {
  id_vpe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_vpe: DataTypes.STRING,
  status: DataTypes.BOOLEAN,
}, {
  freezeTableName: true,
  timestamps: false,
});

export default VpeModel;