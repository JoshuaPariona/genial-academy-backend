import { QuestionController } from "../../controllers/academy/QuestionController";
import { NoMiddlewareBaseRouter } from "../../base/routers/NoMiddlewareBaseRouter";

export class QuestionRouter extends NoMiddlewareBaseRouter<QuestionController> {
  constructor() {
    super(QuestionController, "QuestionRouter", {
      mergeParams: true,
    });
  }

  protected override routes(): void {
    /**
     * @swagger
     * /api/university/{uniId}/area/{areaId}/course/{courseId}/topic/{topicId}/questions:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/questions", this.controller.getQuestions);
  }
}
