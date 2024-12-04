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
    this.router.get("/courses", this.controller.getCourses);

    this.router.get("/course/:courseId", this.controller.getCourse);
  }
}
