import { UserSchemaMiddleware } from "../middlewares/UserSchemaMiddleware";
import { NoControllerBaseRouter } from "./base/NoControllerBaseRouter";

export class UserSchemaRouter extends NoControllerBaseRouter<UserSchemaMiddleware> {
  constructor() {
    super(UserSchemaMiddleware, "UserRouter");
  }

  protected override useMiddleware(): void {}
}
