"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // database:{
    //     host: 'localhost',
    //     user: 'root',
    //     port:3306,
    //     password:'Credicard2023',
    //     database:'intraccr'
    // },
    // database_Auditoria:{
    //     host: 'localhost',
    //     user: 'root',
    //     port:3306,
    //     password:'Credicard2023',
    //     database:'ccr_auditoria'
    // },
    database: {
        host: '10.134.0.219',
        user: 'intraccr',
        port: 3312,
        password: 'mariadb2019',
        database: 'intraccr'
    },
    database_Auditoria: {
        host: '10.134.0.219',
        user: 'user_auditoria_db',
        port: 3335,
        password: 'auditoria_web_2024',
        database: 'ccr_auditoria'
    },
    adminData: {
        SECRET_TOKEN: "MyClave"
    }
};
