import { Router } from "express";

export class BaseRouter<C, M> {
  public router: Router;
  protected controller: C;
  protected middleware: M;

  constructor(Controller: new () => C, Middleware: new () => M) {
    this.router = Router();
    this.controller = new Controller();
    this.middleware = new Middleware();
    this.routes();
  }

  protected routes(): void {
    console.log("Starting router without routes");
  }
}
