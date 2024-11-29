import { AcademySchemaMiddleware } from "../middlewares/AcademySchemaMiddleware";
import { UniversityRouter } from "./academy/UniversityRouter";
import { NoControllerBaseRouter } from "./base/NoControllerBaseRouter";

export class AcademySchemaRouter extends NoControllerBaseRouter<AcademySchemaMiddleware> {
  constructor() {
    super(AcademySchemaMiddleware, "AcademySchemaRouter", {
      mergeParams: true,
    });
  }

  protected override useMiddleware(): void {
    this.router.use(this.middleware.base, new UniversityRouter().router);
  }
}
