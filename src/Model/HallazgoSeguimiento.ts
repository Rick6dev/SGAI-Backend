import { auditSequelize } from "../database";
import { DataTypes, Sequelize } from "sequelize";
import Hallazgo from "./HallazgoModel";
import Auditor from "./AuditModel";
const HallazgoSeguimiento = auditSequelize.define(
  "hallazgo_seguimiento",
  {
    id_comentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_comentario: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_auditor_responsable: {
      type: DataTypes.INTEGER,
      references: {
        model: Auditor,
        key: "id_auditor_responsable",
      },
    },
    id_hallazgo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Hallazgo,
        key: "id_hallazgo",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    // await HallazgoModel.sync({ ignore: true });
  }
);

Hallazgo.belongsTo(Auditor, {
  foreignKey: "id_auditor_responsable",
  onDelete: "CASCADE",
});
// Establecer la relación entre los modelos
HallazgoSeguimiento.belongsTo(Hallazgo, {
  foreignKey: "id_hallazgo",
  onDelete: "CASCADE",
});




export default HallazgoSeguimiento;
