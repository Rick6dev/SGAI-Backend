import { DataTypes, Sequelize } from "sequelize";
import { auditSequelize } from "../database";
import TipoAuditoria from "./TipoAuditoriaModel";

const InformeAuditoria = auditSequelize.define("informe_auditoria", {
  id_informe_auditoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_gerencia_encargada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_informe: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
  },
  cod_informe: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  trimestre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  id_tipo_auditoria: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoAuditoria,
      key: 'id_tipo_auditoria',
    },
  },



}, {
  freezeTableName: true,
  timestamps: false,
});

// Establecer la relación entre los modelos
InformeAuditoria.belongsTo(TipoAuditoria, { // Método para relaciones uno a muchos
  foreignKey: "id_tipo_auditoria", // Clave foránea en InformeAuditoria
});

export default InformeAuditoria;