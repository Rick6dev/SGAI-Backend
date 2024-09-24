import { Sequelize } from "sequelize";
import keys from "./keys";

export const sequelize = new Sequelize(
  keys.database.database,
  keys.database.user,
  keys.database.password,
  {
    dialect: "mariadb",
    host: keys.database.host,
    port: keys.database.port,

    define: {
      timestamps: false,
    },
  }
);

export const auditSequelize = new Sequelize(
  keys.database_Auditoria.database,
  keys.database_Auditoria.user,
  keys.database_Auditoria.password,
  {
    dialect: "mariadb",
    host: keys.database_Auditoria.host,
    port: keys.database_Auditoria.port,
  }
);
