import { Router, RouterOptions } from "express";
import { Logger, LogLevel } from "../../utils/Logger";

export class NoControllerBaseRouter<M> {
  public router: Router;
  protected readonly feature: string;
  protected readonly tag: string = "Router";
  protected middleware: M;

  constructor(
    Middleware: new () => M,
    feature: string,
    options?: RouterOptions
  ) {
    this.feature = feature;
    this.router = Router(options);
    this.middleware = new Middleware();
    this.useMiddleware();
  }

  protected useMiddleware(): void {
    Logger.log({
      level: LogLevel.Warning,
      tag: this.tag,
      feature: this.feature,
      message: "Starting router without middlewares",
    });
  }
}
