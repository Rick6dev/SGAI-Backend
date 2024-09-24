"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    LDAP: {
        PROTOCOL: "ldap",
        HOST: "10.132.0.25",
        PORT: "389",
        BASE: "dc=credicard,dc=com,dc=ve",
        ADM_DN: "cn=admin,dc=credicard,dc=com,dc=ve",
        ADM_PASS: "ldapcr3d1c4rd.",
        USERS_BASE: "ou=users,dc=credicard,dc=com,dc=ve",
        ROLES_BASE: "ou=groups,dc=credicard,dc=com,dc=ve",
        PWD_POLICIES: "ou=pwpolicy,dc=credicard,dc=com,dc=ve",
        USERNAMELDAP: "usrsrvautgst@credicard.com.ve",
        PASSAD: "DQV@T+8/*7%=",
    },
    SERVER: {
        PORT: "443",
        KEY_FILE_PATH: "./lcsdevapptdmaster.credicard.com.ve.key",
        CERT_FILE_PATH: "./lcsdevapptdmaster.credicard.com.ve.pem",
        CERT_PASSPHRASE: "Hber-ap5-78.g45",
    }
};
