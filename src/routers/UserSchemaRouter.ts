import { UserSchemaController } from "../controllers/UserSchemaController";
import { UserSchemaMiddleware } from "../middlewares/UserSchemaMiddleware";
import { BaseRouter } from "./base/BaseRouter";

export class UserSchemaRouter extends BaseRouter<
  UserSchemaController,
  UserSchemaMiddleware
> {
  constructor() {
    super(UserSchemaController, UserSchemaMiddleware, "UserRouter");
  }

  protected override routes(): void {}
}
