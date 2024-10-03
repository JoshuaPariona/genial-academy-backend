import { BaseRouter } from "./BaseRouter";
import { AuthUserController } from "../controllers/AuthUserController";
import { AuthUserMiddleware } from "../middlewares/AuthUserMiddleware";

export class AuthUserRouter extends BaseRouter<
  AuthUserController,
  AuthUserMiddleware
> {
  constructor() {
    super(AuthUserController, AuthUserMiddleware);
  }

  protected override routes(): void {
    this.router.get("/auth", (req, res) =>
      this.controller.getAuthUser(req, res)
    );
  }
}
