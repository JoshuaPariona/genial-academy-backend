import { LevelController } from "../../controllers/academy/LevelController";
import { NoMiddlewareBaseRouter } from "../../base/routers/NoMiddlewareBaseRouter";

export class LevelRouter extends NoMiddlewareBaseRouter<LevelController> {
  constructor() {
    super(LevelController, "LevelRouter");
  }

  protected override routes(): void {
    this.router.get("/levels", this.controller.getLevels);
  }
}
