import { TopicController } from "../../controllers/academy/TopicController";
import { NoMiddlewareBaseRouter } from "../base/NoMiddlewareBaseRouter";
import { QuestionRouter } from "./QuestionRouter";

export class TopicRouter extends NoMiddlewareBaseRouter<TopicController> {
  constructor() {
    super(TopicController, "TopicRouter", {
      mergeParams: true,
    });
    this.router.use("/topic/:topicId", new QuestionRouter().router);
  }

  protected override routes(): void {
    this.router.get("/topics", this.controller.getTopics);

    this.router.get("/topic/:topicId", this.controller.getTopic);
  }
}
