import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";
import { Logger, LogLevel } from "../../utils/Logger";
import { Responser } from "../../utils/Responser";

export class UserController {
  private readonly userService: UserService = new UserService();
  protected readonly tag: string = "UserController";

  public get getUser() {
    return async (req: Request, res: Response) => {
      const { userId } = req.params;
      try {
        const user = await this.userService.find(userId);
        if (!user) {
          Responser.NOT_FOUND(res);
          return;
        }
        Responser.OK(res, user);
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "User",
            message: `Error getting user: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "User",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get updateUser() {
    return async (req: Request, res: Response) => {
      const { userId } = req.params;
      const updateUser = req.body;
      try {
        const user = await this.userService.find(userId);
        if (!user) {
          Responser.NOT_FOUND(res, "Usuario no encontrado.");
          return;
        }
        const result = await this.userService.update(userId, updateUser);
        //filas afectaddas
        if (!result.affected) {
          Responser.BAD_REQUEST(res);
          return;
        }
        if (result.affected > 1) {
          console.log("Esto no deberia pasar XDD");
          return;
        }
        Responser.OK(res, result.affected);
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "User",
            message: `Error updating user: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "User",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get updateUserCoins() {
    return async (req: Request, res: Response) => {
      const { userId } = req.params;
      const dto = req.body;
      try {
        const user = await this.userService.find(userId);
        if (!user) {
          Responser.NOT_FOUND(res, "Usuario no encontrado.");
          return;
        }
        const result = await this.userService.updateCoins(
          userId,
          user.coins,
          dto
        );
        if (!result) {
          Responser.BAD_REQUEST(res, "No es posible realizar la accion.");
          return;
        }
        if (!result.affected) {
          Responser.BAD_REQUEST(res);
          return;
        }
        if (result.affected > 1) {
          console.log("Esto no deberia pasar XDD");
          return;
        }
        Responser.OK(res, result.affected);
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "User",
            message: `Error updating user coins: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "User",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }
}
