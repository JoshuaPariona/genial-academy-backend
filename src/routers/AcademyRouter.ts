import { BaseRouter } from "./base/BaseRouter";
import { AcademyController } from "../controllers/AcademyController";
import { AcademyMiddleware } from "../middlewares/AcademyMiddleware";

export class AcademyRouter extends BaseRouter<
  AcademyController,
  AcademyMiddleware
> {
  constructor() {
    super(AcademyController, AcademyMiddleware, "Academy");
  }

  protected override routes(): void {
    this.router.get("/universities", (req, res) => {
      this.controller.getUniversities(req, res);
    });

    this.router.get("/university/:id", (req, res) => {
      this.controller.getUniversityById(req, res);
    });

    this.router.post("/university", (req, res) => {
      this.controller.postUniversity(req, res);
    });

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
