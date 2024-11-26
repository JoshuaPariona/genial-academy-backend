import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AuthUserEntity } from "../../entities/AuthUserEntity";
import { Responser } from "../../utils/Responser";

export class AuthMiddleware {
  private isAuthUserEntity(user: any) {
    return user && typeof user.role === "string" && typeof user.id === "string";
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

  public validateAuthUserEntity(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    /*
    if (!this.isAuthUserEntity(req.user)) {
      return Responser.BAD_REQUEST(res, "Usuario no válido");
    }*/
    next();
  }

  public authenticate(stgName: string) {
    return passport.authenticate(stgName, { session: false });
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
    const { id } = req.params;
    if (authUser.user.id === id) {
      return next();
    }
    return Responser.UNAUTHORIZED(res, "No tienes suficientes permisos");
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
