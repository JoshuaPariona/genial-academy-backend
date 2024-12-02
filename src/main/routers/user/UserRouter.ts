import { UserController } from "../../controllers/user/UserController";
import { UserMiddleware } from "../../middlewares/user/UserMiddleware";
import { BaseRouter } from "../base/BaseRouter";

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware, "UserRouter");
  }

  protected override routes(): void {
    this.router.get("/user/:id", this.controller.getUser);
  }
}
