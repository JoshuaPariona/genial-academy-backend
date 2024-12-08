import { UserController } from "../../controllers/user/UserController";
import { UserSchemaMiddleware } from "../../middlewares/UserSchemaMiddleware";
import { BaseRouter } from "../../base/routers/BaseRouter";

export class UserRouter extends BaseRouter<
  UserController,
  UserSchemaMiddleware
> {
  constructor() {
    super(UserController, UserSchemaMiddleware, "UserRouter");
  }

  protected override routes(): void {
    /**
     * @swagger
     * /api/user/{userId}:
     *   get:
     *    tags:
     *       - UserSchema
     */
    this.router.get("/user/:userId", this.controller.getUser);

    /**
     * @swagger
     * /api/user/{userId}:
     *   patch:
     *    tags:
     *       - UserSchema
     */
    this.router.patch(
      "/user/:userId",
      this.middleware.validateOwnerUser,
      this.middleware.validateUpdateUserDTO,
      this.controller.updateUser
    );

    /**
     * @swagger
     * /api/user/{userId}/coins:
     *   patch:
     *    tags:
     *       - UserSchema
     */
    this.router.patch(
      "/user/:userId/coins",
      this.middleware.validateOwnerUser,
      this.middleware.validateUpdateUserCoinsDTO,
      this.controller.updateUserCoins
    );
  }
}
