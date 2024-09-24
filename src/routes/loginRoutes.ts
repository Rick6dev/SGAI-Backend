import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { authController } from "../middleware/auth-middleware";

class LoginRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/login",loginController.loginValidate);
    // ,authController.UserDirectory
    // this.router.post("/loginDirectory", loginController.UserDirectory);
  }
}

const loginRoutes = new LoginRoutes();

export default loginRoutes.router;
