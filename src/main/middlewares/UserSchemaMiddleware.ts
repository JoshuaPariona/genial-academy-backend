import { NextFunction, Request, Response } from "express";

export class UserSchemaMiddleware {
  public get base(): Array<
    (req: Request, res: Response, next: NextFunction) => void
  > {
    return [this.validateQueryParams, this.validatePathParams];
  }

  public get user(): Array<
    (req: Request, res: Response, next: NextFunction) => void
  > {
    return [this.validateQueryParams, this.validatePathParams];
  }

  private validateQueryParams(req: Request, res: Response, next: NextFunction) {
    next();
  }

  private validatePathParams(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
