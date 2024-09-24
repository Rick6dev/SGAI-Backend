
import { DataTypes, Sequelize } from "sequelize";
import {sequelize}  from "../database";
import VpModel from "./VPModel";



const GrcModel = sequelize.define('INTRA_GERENCIA', {
    
        id_gerencia: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre_gerencia: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        id_vp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: VpModel,
            key: "id_vp",
          },
        },
        status: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
      }, {
        // Agrega el parámetro pluralize
        freezeTableName: true,
      }
);

GrcModel.belongsTo(VpModel, { 
  foreignKey: "id_vp", 
});

export default GrcModel;