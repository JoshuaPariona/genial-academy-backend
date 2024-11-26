import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { JwtStrategy } from "../auth/strategies/JwtStrategy";

export class AcademySchemaMiddleware extends AuthMiddleware {
  public get base(): Array<
    (req: Request, res: Response, next: NextFunction) => void
  > {
    return [
      this.authenticate(JwtStrategy.stgName),
      this.validateIsAuthenticated,
      this.validateAuthUserEntity,
    ];
  }
}
