import { BaseRouter } from "./base/BaseRouter";
import { AcademySchemaController } from "../controllers/AcademySchemaController";
import { AcademySchemaMiddleware } from "../middlewares/AcademySchemaMiddleware";

export class AcademySchemaRouter extends BaseRouter<
  AcademySchemaController,
  AcademySchemaMiddleware
> {
  constructor() {
    super(AcademySchemaController, AcademySchemaMiddleware, "AcademyRouter");
  }

  protected override routes(): void {
    /**
     * @swagger
     * /universities:
     *   get:
     *     summary: Obtiene una lista de todas las universidades
     *     responses:
     *       200:
     *         description: Lista de universidades
     */
    this.router.get(
      "/universities",
      this.middleware.base,
      this.controller.getUniversities
    );

    this.router.get("/university/:id", this.controller.getUniversityByIdOrSlug);

    /*

    this.router.get("/areas", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/area/:id", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/careers", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/career/:id", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/courses", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/course/:id", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/topics", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/topic/:id", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/questions", (req, res) =>
      //return 7, 3 basic, 2 intermediate, 2 advance,
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/levels", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/materials", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    this.router.get("/material/:id", (req, res) =>
      this.controller.getUniversityById(req, res)
    );

    */
  }
}
