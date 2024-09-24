"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const keys_1 = __importDefault(require("./keys"));
exports.sequelize = new sequelize_1.Sequelize(keys_1.default.database.database, keys_1.default.database.user, keys_1.default.database.password, {
    dialect: "mariadb",
    host: keys_1.default.database.host,
    port: keys_1.default.database.port,
    define: {
        timestamps: false,
    },
});
exports.auditSequelize = new sequelize_1.Sequelize(keys_1.default.database_Auditoria.database, keys_1.default.database_Auditoria.user, keys_1.default.database_Auditoria.password, {
    dialect: "mariadb",
    host: keys_1.default.database_Auditoria.host,
    port: keys_1.default.database_Auditoria.port,
});
