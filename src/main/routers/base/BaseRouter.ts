import { Router } from "express";
import { Logger, LogLevel } from "../../utils/Logger";

export class BaseRouter<C, M> {
  public router: Router;
  protected readonly feature: string;
  protected readonly tag: string = "Router";
  protected controller: C;
  protected middleware: M;

  constructor(
    Controller: new () => C,
    Middleware: new () => M,
    feature: string
  ) {
    this.feature = feature;
    this.router = Router();
    this.controller = new Controller();
    this.middleware = new Middleware();
    this.routes();
  }

  protected routes(): void {
    Logger.log({
      level: LogLevel.Warning,
      tag: this.tag,
      feature: this.feature,
      message: "Starting router without routes",
    });
  }
}
