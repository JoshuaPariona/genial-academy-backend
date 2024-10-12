import { Router } from "express";
import { Logger } from "../../utils/Logger";

export class BaseRouter<C, M> {
  public router: Router;
  protected readonly logger: Logger;
  protected readonly feature: string;
  protected controller: C;
  protected middleware: M;

  constructor(
    Controller: new () => C,
    Middleware: new () => M,
    feature: string
  ) {
    this.feature = feature;
    this.logger = new Logger("Router");
    this.router = Router();
    this.controller = new Controller();
    this.middleware = new Middleware();
    this.routes();
  }

  protected routes(): void {
    this.logger.warning("Starting router without routes", this.feature);
  }
}
