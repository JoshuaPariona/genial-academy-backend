import { Request, Response } from "express";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";
import { AuthService } from "../services/AuthService";
import { AuthUserEntity } from "../../entities/AuthUserEntity";

export class AuthController {
  private readonly authService: AuthService = new AuthService();

  protected readonly tag: string = "AuthController";

  public get signIn(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const authUser = req.user as AuthUserEntity;
        const jwtJson = await this.authService.generateJwt(authUser);
        res.header("Content-Type", "application/json");
        res.cookie("accessToken", jwtJson.accessToken, {maxAge: 60000 * 60});
        Responser.OK(res, jwtJson, "Autorizado");
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Auth",
            message: `Error on signIn: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Auth",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get signOut(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const data = ["", ""];
        if (data.length === 0) {
          Responser.NOT_FOUND(res);
        } else {
          Responser.OK(res, data);
        }
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Auth",
            message: `Error on login: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Auth",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get signUp(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        /*
        const body = req.body as SignUpUserDTO;
        const [isEmailUsed, isUsernameUsed] = await Promise.all([
          this.authUserService.isEmailUsed(body.email),
          this.authUserService.isUsernameUsed(body.username),
        ]);

        if (isEmailUsed || isUsernameUsed) {
          Responser.BAD_REQUEST(
            res,
            isEmailUsed
              ? "El correo electrónico esta actualmente en uso 😅, intenta con otro"
              : "El nombre de usuario esta actualmente en uso 😅, intenta con otro"
          );
        } else {
          const passwordHash = await bcrypt.hash(body.password, 10);
          const publicEmail = body.email;
          const user = this.userService.create({ ...body, publicEmail });
          const authUser = this.authUserService.create({
            ...body,
            passwordHash,
          });
          authUser.user = user;
          await this.authUserService.save(authUser);

          Responser.OK(
            res,
            `Registro exitoso, Como estas ${body.names} ${body.surNames} 🚀`
          );
        }
          */
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Auth",
            message: `Error on signUp: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Auth",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }
}