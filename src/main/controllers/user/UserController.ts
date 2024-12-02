import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";
import { Logger, LogLevel } from "../../utils/Logger";
import { Responser } from "../../utils/Responser";

export class UserController {
  private readonly userService: UserService = new UserService();
  protected readonly tag: string = "UserController";

  public get getUser() {
    return async (req: Request, res: Response) => {
      const {id} = req.params;
      try {
        const user = await this.userService.find(id);
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
}
