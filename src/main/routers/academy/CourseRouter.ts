import { CourseController } from "../../controllers/academy/CourseController";
import { NoMiddlewareBaseRouter } from "../base/NoMiddlewareBaseRouter";

export class CourseRouter extends NoMiddlewareBaseRouter<CourseController> {
  constructor() {
    super(CourseController, "CourseRouter", {
      mergeParams: true,
    });
  }

  protected override routes(): void {
    this.router.get("/courses", this.controller.getCourses);

    this.router.get("/course/:courseId", this.controller.getCourse);
  }
}
