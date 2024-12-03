import { UserController } from "../../controllers/user/UserController";
import { UserSchemaMiddleware } from "../../middlewares/UserSchemaMiddleware";
import { BaseRouter } from "../base/BaseRouter";

export class UserRouter extends BaseRouter<
  UserController,
  UserSchemaMiddleware
> {
  constructor() {
    super(UserController, UserSchemaMiddleware, "UserRouter");
  }

  protected override routes(): void {
    this.router.get("/user/:userId", this.controller.getUser);

    this.router.patch(
      "/user/:userId",
      this.middleware.validateOwnerUser,
      this.middleware.validateUpdateUserDTO,
      this.controller.updateUser
    );

    this.router.patch(
      "/user/:userId/coins",
      this.middleware.validateOwnerUser,
      this.middleware.validateUpdateUserCoinsDTO,
      this.controller.updateUserCoins
    );
  }
}
