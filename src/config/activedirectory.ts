import ActiveDirectory from "activedirectory2";
import { config } from "dotenv";
import { Request, Response } from "express";
import { get } from "http";
import configData from "./configData";
export const configLdap = {
  url:
    configData.LDAP.PROTOCOL +
    "://" +
    configData.LDAP.HOST +
    ":" +
    configData.LDAP.PORT,
  baseDN: configData.LDAP.BASE,
  username: configData.LDAP.USERNAMELDAP,
  password: configData.LDAP.PASSAD,
};
