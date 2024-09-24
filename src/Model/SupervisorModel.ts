import { sequelize } from "../database";
import { DataTypes, Sequelize } from "sequelize";



// Define model
const IntraSupervisor = sequelize.define('INTRA_SUPERVISOR', {
  id_supervisor: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ci_supervisor: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_sup1: {
    type:DataTypes.STRING(255),
    allowNull: false,
  },
  nombre_sup2: {
    type:DataTypes.STRING(255),
  },
  apellido_sup1: {
    type:DataTypes.STRING(255),
    allowNull: false,
  },
  apellido_sup2: {
    type:DataTypes.STRING(255),
  },
  telefono_extension: {
    type:DataTypes.STRING(50),
  },
  id_cargo: {
    type:DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'INTRA_CARGO',
      key: 'id_cargo',
    },
  },
  id_dpto: {
    type:DataTypes.INTEGER,
    references: {
      model: 'INTRA_DPTO',
      key: 'id_dpto',
    },
  },
  id_gerencia: {
    type:DataTypes.INTEGER,
    references: {
      model: 'INTRA_GERENCIA',
      key: 'id_gerencia',
    },
  },
  id_vp: {
    type:DataTypes.INTEGER,
    references: {
      model: 'INTRA_VP',
      key: 'id_vp',
    },
  },
  id_vpe: {
    type:DataTypes.INTEGER,
    references: {
      model: 'INTRA_VPE',
      key: 'id_vpe',
    },
  },
  id_pe: {
    type:DataTypes.INTEGER,
    references: {
      model: 'INTRA_PE',
      key: 'id_pe',
    },
  },
  id_status: {
    type:DataTypes.INTEGER,
    defaultValue: 1,
    references: {
      model: 'INTRA_STATUS_SUP',
      key: 'id_status',
    },
  },
}, {
  // Define table options
  tableName: 'INTRA_SUPERVISOR',
  timestamps: false, // disable timestamps for this model
});

export default IntraSupervisor;
// Export model
