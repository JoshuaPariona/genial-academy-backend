import { QuestionController } from "../../controllers/academy/QuestionController";
import { NoMiddlewareBaseRouter } from "../base/NoMiddlewareBaseRouter";

export class QuestionRouter extends NoMiddlewareBaseRouter<QuestionController> {
  constructor() {
    super(QuestionController, "QuestionRouter", {
      mergeParams: true,
    });
  }

  protected override routes(): void {
    this.router.get("/questions", this.controller.getQuestions);
  }
}
