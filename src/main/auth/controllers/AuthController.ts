import { Request, Response } from "express";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";
import { AuthService } from "../services/AuthService";
import { AuthUserEntity } from "../../entities/AuthUserEntity";
import { SignUpUserDTO } from "../validations/dto/SignUpUserDTO";

export class AuthController {
  private readonly authService: AuthService = new AuthService();
  protected readonly tag: string = "AuthController";

  public get signIn() {
    return async (req: Request, res: Response) => {
      try {
        const authUser = req.user as AuthUserEntity;
        const jwtJson = await this.authService.generateJwt(authUser);
        res.header("Content-Type", "application/json");
        res.cookie("accessToken", jwtJson.accessToken, { maxAge: 60000 * 60 });
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

  public get signOut() {
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

  public get signUp() {
    return async (req: Request, res: Response) => {
      try {
        const signUpDto = req.body as SignUpUserDTO;

        const [isEmailUsed, isUsernameUsed] = await Promise.all([
          this.authService.isEmailUsed(signUpDto.email),
          this.authService.isUsernameUsed(signUpDto.username),
        ]);
        if (isEmailUsed || isUsernameUsed) {
          const msg = isEmailUsed ? "correo electrónico" : "nombre de usuario";
          Responser.BAD_REQUEST(
            res,
            `El ${msg} esta actualmente en uso 😅, intenta con otro`
          );
        } else {
          const authUser = await this.authService.saveAuthUserWithUser(
            signUpDto
          );
          Responser.CREATED(
            res,
            authUser.user,
            `Registro exitoso, Como estas ${authUser.user.names} ${authUser.user.surNames} 🚀`
          );
        }
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
