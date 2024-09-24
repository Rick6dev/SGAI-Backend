import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize, sequelize } from "../database";
import Auditor from "./AuditModel";

const Vacacion = auditSequelize.define(
  "vacacion",
  {
    id_vacacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_auditor_responsable:{
        type:DataTypes.INTEGER,
        references:{
            model:Auditor,
            key:"id_auditor_responsable"
        },
    },
    fecha_inicio:{
      type:DataTypes.DATE,
    },
    fecha_culminacion:{
        type:DataTypes.DATE
    } ,
    fecha_reingreso:{
        type:DataTypes.DATE
    },
    year:{
        type:DataTypes.INTEGER
    }
    
    
  },
  {
    freezeTableName: true,
    timestamps:false
  }
);

Vacacion.belongsTo(Auditor,{
    foreignKey:"id_auditor_responsable"
});

export default Vacacion;
