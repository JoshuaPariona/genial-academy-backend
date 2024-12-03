import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AuthUserEntity } from "../../entities/AuthUserEntity";
import { Responser } from "../../utils/Responser";
import { JwtStrategy } from "../strategies/JwtStrategy";
import { SignUpUserDTO } from "../validations/dto/SignUpUserDTO";
import { validateSync } from "class-validator";
import { LocalStrategy } from "../strategies/LocalStrategy";

export class AuthMiddleware {
  public validateSignUpUserDTO(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors = validateSync(new SignUpUserDTO(req.body));
    if (errors.length > 0) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints || {}).join(", ")
      );
      return Responser.BAD_REQUEST(res, errorMessages);
    }
    next();
  }

  public validateIsAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.user || !req.isAuthenticated()) {
      return Responser.BAD_REQUEST(res, "Inicia sesión primero");
    }
    next();
  }

  public get authenticateWithLocal() {
    return passport.authenticate(LocalStrategy.stgName, { session: false });
  }

  public get authenticateWithJwt() {
    return passport.authenticate(JwtStrategy.stgName, { session: false });
  }

  // Must be authenticated -> use validateIsAuthenticated
  public validateAdminOnly(req: Request, res: Response, next: NextFunction) {
    const authUser = req.user as AuthUserEntity;
    if (authUser.role === "admin") {
      return next();
    }
    return Responser.UNAUTHORIZED(res, "No tienes suficientes permisos");
  }

  // Must be authenticated
  public validateOwnerUser(req: Request, res: Response, next: NextFunction) {
    const authUser = req.user as AuthUserEntity;
    const { userId } = req.params;
    if (authUser.user.id === userId) {
      return next();
    }
    return Responser.UNAUTHORIZED(
      res,
      "No puedes modificar modificar datos de otros usuarios"
    );
  }

  // Must be authenticated
  public validateOwnerAuthUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authUser = req.user as AuthUserEntity;
    const { id } = req.params;
    if (authUser.id === id) {
      return next();
    }
    return Responser.UNAUTHORIZED(res, "No tienes suficientes permisos");
  }

  // Must be authenticated
  public validateDataOwner(
    dataField: any
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
      // data field puede ser author, user o created_by, etc
      //TODO: validar solo el usuario dueno del registro pueda modificar o alterar los registros q el crea
      next();
    };
  }
}
