import { NextFunction, Request, Response } from "express";
import { AppConfig } from "../../config/AppConfig";
import { Responser } from "../../utils/Responser";

export class ApiKeyMiddleware {
  public static apiKey(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void {
    return (req, res, next) => {
      const apiKey = req.headers["x-api-key"];

      if (!apiKey) {
        return Responser.UNAUTHORIZED(res, "API Key is missing");
      }

      if (apiKey !== AppConfig.getEnvString("API_KEY")) {
        return Responser.FORBIDDEN(res, "Invalid API Key");
      }

      next();
    };
  }
}
