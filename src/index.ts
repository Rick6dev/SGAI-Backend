import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
// import gamesRoutes from './routes/gamesRoutes';
import adminRoutes from "./routes/adminRoutes";
import informeAuditoriaRoutes from "./routes/informeAuditoriaRoutes";
import hallazgoAudRoutes from "./routes/hallazgoRoutes";
import { auditSequelize, sequelize } from "./database";
import loginRoutes from "./routes/loginRoutes";
import { authController } from "./middleware/auth-middleware";
import * as https from 'https';
import * as fs from 'fs';
import configData from "./config/configData";
import vacacionRoutes from "./routes/vacacionRoutes";
import planifiicacionRoutes from "./routes/planifiicacionRoutes";
class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    // this.connectMainDatabase()
    this.connectAuditDatabase();
    this.routes();
  }

  config(): void {
    this.app.set("port", this.normalizePort(process.env.PORT || configData.SERVER.PORT));
    this.app.use(morgan("dev"));
    // Permite pedi los datos  al servidor  por el frontend
    this.app.use(express.json());
    // Permite enviar datos desde datos desde un formulario
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  routes(): void {
    this.app.use("/api/admin", authController.isAuth, adminRoutes);
    this.app.use(
      "/api/informeAud",
      authController.isAuth,
      informeAuditoriaRoutes
    );
    this.app.use("/api/hallazgo", authController.isAuth, hallazgoAudRoutes);
    this.app.use("/", loginRoutes);
    this.app.use("/api/vacacion",vacacionRoutes);
    this.app.use("/api/planificacion",planifiicacionRoutes)
  }

  async connectAuditDatabase() {
    try {
      await auditSequelize.authenticate();
      console.log("Connected to audit database");
      return auditSequelize;
    } catch (error) {
      console.error("Error connecting to audit database:", error);
      throw error;
    }
  }
  start(): void {
    const server = https.createServer({
      key: fs.readFileSync(configData.SERVER.KEY_FILE_PATH),
      cert: fs.readFileSync(configData.SERVER.CERT_FILE_PATH),
    }, 
      this.app
    );

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    server.listen(this.app.get("port"), () => {
      console.log(`Server on port ${this.app.get("port")}`);
    });
  }
  
  normalizePort = (val:any) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
}


const server = new Server();
server.start();
