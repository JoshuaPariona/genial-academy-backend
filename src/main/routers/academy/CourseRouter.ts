import { CourseController } from "../../controllers/academy/CourseController";
import { NoMiddlewareBaseRouter } from "../../base/routers/NoMiddlewareBaseRouter";
import { TopicRouter } from "./TopicRouter";

export class CourseRouter extends NoMiddlewareBaseRouter<CourseController> {
  constructor() {
    super(CourseController, "CourseRouter", {
      mergeParams: true,
    });
    this.router.use("/course/:courseId", new TopicRouter().router);
  }

  protected override routes(): void {
    /**
     * @swagger
     * /api/university/{uniId}/area/{areaId}/courses:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/courses", this.controller.getCourses);

    /**
     * @swagger
     * /api/university/{uniId}/area/{areaId}/course/{courseId}:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/course/:courseId", this.controller.getCourse);
  }
}
