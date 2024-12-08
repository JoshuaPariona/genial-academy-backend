import { LevelController } from "../../controllers/academy/LevelController";
import { NoMiddlewareBaseRouter } from "../../base/routers/NoMiddlewareBaseRouter";

export class LevelRouter extends NoMiddlewareBaseRouter<LevelController> {
  constructor() {
    super(LevelController, "LevelRouter");
  }

  protected override routes(): void {
    /**
     * @swagger
     * /api/levels:
     *   get:
     *    tags:
     *       - AcademySchema
     */
    this.router.get("/levels", this.controller.getLevels);
  }
}
