import { Router, RouterOptions } from "express";
import { Logger, LogLevel } from "../../utils/Logger";

export class NoMiddlewareBaseRouter<C> {
  public router: Router;
  protected readonly feature: string;
  protected readonly tag: string = "Router";
  protected controller: C;

  constructor(
    Controller: new () => C,
    feature: string,
    options?: RouterOptions
  ) {
    this.feature = feature;
    this.router = Router(options);
    this.controller = new Controller();
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
