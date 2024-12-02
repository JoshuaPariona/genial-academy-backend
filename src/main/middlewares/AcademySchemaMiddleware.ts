import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";

export class AcademySchemaMiddleware extends AuthMiddleware {
  public get base(): Array<
    (req: Request, res: Response, next: NextFunction) => void
  > {
    return [this.authenticateWithJwt, this.validateIsAuthenticated];
  }
}
