import { AreaController } from "../../controllers/academy/AreaController";
import { NoMiddlewareBaseRouter } from "../../base/routers/NoMiddlewareBaseRouter";
import { CourseRouter } from "./CourseRouter";

export class AreaRouter extends NoMiddlewareBaseRouter<AreaController> {
  constructor() {
    super(AreaController, "AreaRouter", {
      mergeParams: true,
    });
    this.router.use("/area/:areaId", new CourseRouter().router);
  }

  protected override routes(): void {
    /**
     * @swagger
     * /api/university/{uniId}/areas:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/areas", this.controller.getAreas);

    /**
     * @swagger
     * /api/university/{uniId}/area/{areaId}:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/area/:areaId", this.controller.getArea);
  }
}
