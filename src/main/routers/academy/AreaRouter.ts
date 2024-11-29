import { AreaController } from "../../controllers/academy/AreaController";
import { NoMiddlewareBaseRouter } from "../base/NoMiddlewareBaseRouter";
import { CourseRouter } from "./CourseRouter";

export class AreaRouter extends NoMiddlewareBaseRouter<AreaController> {
  constructor() {
    super(AreaController, "AreaRouter", {
      mergeParams: true,
    });
    this.router.use("/area/:areaId", new CourseRouter().router);
  }

  protected override routes(): void {
    this.router.get("/areas", this.controller.getAreas);

    this.router.get("/area/:areaId", this.controller.getArea);
  }
}
