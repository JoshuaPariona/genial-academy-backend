import { UserSchemaMiddleware } from "../middlewares/UserSchemaMiddleware";
import { NoControllerBaseRouter } from "./base/NoControllerBaseRouter";
import { UserRouter } from "./user/UserRouter";

export class UserSchemaRouter extends NoControllerBaseRouter<UserSchemaMiddleware> {
  constructor() {
    super(UserSchemaMiddleware, "UserRouter");
  }

  protected override useMiddleware(): void {
    this.router.use(this.middleware.base, new UserRouter().router);
  }
}
