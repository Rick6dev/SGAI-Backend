"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// import gamesRoutes from './routes/gamesRoutes';
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const informeAuditoriaRoutes_1 = __importDefault(require("./routes/informeAuditoriaRoutes"));
const hallazgoRoutes_1 = __importDefault(require("./routes/hallazgoRoutes"));
const database_1 = require("./database");
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const auth_middleware_1 = require("./middleware/auth-middleware");
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const configData_1 = __importDefault(require("./config/configData"));
const vacacionRoutes_1 = __importDefault(require("./routes/vacacionRoutes"));
const planifiicacionRoutes_1 = __importDefault(require("./routes/planifiicacionRoutes"));
class Server {
    constructor() {
        this.normalizePort = (val) => {
            const port = parseInt(val, 10);
            if (isNaN(port)) {
                return val;
            }
            if (port >= 0) {
                return port;
            }
            return false;
        };
        this.app = (0, express_1.default)();
        this.config();
        // this.connectMainDatabase()
        this.connectAuditDatabase();
        this.routes();
    }
    config() {
        this.app.set("port", this.normalizePort(process.env.PORT || configData_1.default.SERVER.PORT));
        this.app.use((0, morgan_1.default)("dev"));
        // Permite pedi los datos  al servidor  por el frontend
        this.app.use(express_1.default.json());
        // Permite enviar datos desde datos desde un formulario
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use("/api/admin", auth_middleware_1.authController.isAuth, adminRoutes_1.default);
        this.app.use("/api/informeAud", auth_middleware_1.authController.isAuth, informeAuditoriaRoutes_1.default);
        this.app.use("/api/hallazgo", auth_middleware_1.authController.isAuth, hallazgoRoutes_1.default);
        this.app.use("/", loginRoutes_1.default);
        this.app.use("/api/vacacion", vacacionRoutes_1.default);
        this.app.use("/api/planificacion", planifiicacionRoutes_1.default);
    }
    connectAuditDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.auditSequelize.authenticate();
                console.log("Connected to audit database");
                return database_1.auditSequelize;
            }
            catch (error) {
                console.error("Error connecting to audit database:", error);
                throw error;
            }
        });
    }
    start() {
        const server = https.createServer({
            key: fs.readFileSync(configData_1.default.SERVER.KEY_FILE_PATH),
            cert: fs.readFileSync(configData_1.default.SERVER.CERT_FILE_PATH),
        }, this.app);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        server.listen(this.app.get("port"), () => {
            console.log(`Server on port ${this.app.get("port")}`);
        });
    }
}
const server = new Server();
server.start();
