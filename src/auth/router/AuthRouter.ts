import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AuthController } from "../controllers/AuthController";
import { LocalStrategy } from "../strategies/LocalStrategy";

export class AuthRouter {
  public router: Router;
  private readonly authMiddleware = new AuthMiddleware();
  private readonly authController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/signup", []);

    this.router.post(
      "/signin",
      [
        this.authMiddleware.authenticate(LocalStrategy.stgName),
        this.authMiddleware.validateIsAuthenticated,
      ],
      this.authController.signIn
    );

    this.router.post("/google", []);

    this.router.post("/facebook", []);

    //this.router.post("/signout", this.controller.signOut);
  }
}
