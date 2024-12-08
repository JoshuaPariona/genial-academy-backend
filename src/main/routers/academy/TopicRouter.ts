import { TopicController } from "../../controllers/academy/TopicController";
import { NoMiddlewareBaseRouter } from "../../base/routers/NoMiddlewareBaseRouter";
import { QuestionRouter } from "./QuestionRouter";

export class TopicRouter extends NoMiddlewareBaseRouter<TopicController> {
  constructor() {
    super(TopicController, "TopicRouter", {
      mergeParams: true,
    });
    this.router.use("/topic/:topicId", new QuestionRouter().router);
  }

  protected override routes(): void {
    /**
     * @swagger
     * /api/university/{uniId}/area/{areaId}/course/{courseId}/topics:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/topics", this.controller.getTopics);

    /**
     * @swagger
     * /api/university/{uniId}/area/{areaId}/course/{courseId}/topic/{topicId}:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/topic/:topicId", this.controller.getTopic);
  }
}
