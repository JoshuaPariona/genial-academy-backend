import { NextFunction, Request, Response } from "express";
import { validateSync } from "class-validator";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { Responser } from "../utils/Responser";
import { UpdateUserDTO } from "../validations/dto/UpdateUserDTO";
import { UpdateUserCoinsDTO } from "../validations/dto/UpdateUserCoinsDTO";

export class UserSchemaMiddleware extends AuthMiddleware {
  public get base(): Array<
    (req: Request, res: Response, next: NextFunction) => void
  > {
    return [this.authenticateWithJwt, this.validateIsAuthenticated];
  }

  public get validateUpdateUserDTO() {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validateSync(new UpdateUserDTO(req.body));
      if (errors.length > 0) {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints || {}).join(", ")
        );
        return Responser.BAD_REQUEST(res, errorMessages);
      }
      next();
    };
  }

  public get validateUpdateUserCoinsDTO() {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validateSync(new UpdateUserCoinsDTO(req.body));
      if (errors.length > 0) {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints || {}).join(", ")
        );
        return Responser.BAD_REQUEST(res, errorMessages);
      }
      next();
    };
  }
}
