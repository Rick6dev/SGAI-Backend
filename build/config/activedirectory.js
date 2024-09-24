"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLdap = void 0;
const configData_1 = __importDefault(require("./configData"));
exports.configLdap = {
    url: configData_1.default.LDAP.PROTOCOL +
        "://" +
        configData_1.default.LDAP.HOST +
        ":" +
        configData_1.default.LDAP.PORT,
    baseDN: configData_1.default.LDAP.BASE,
    username: configData_1.default.LDAP.USERNAMELDAP,
    password: configData_1.default.LDAP.PASSAD,
};
