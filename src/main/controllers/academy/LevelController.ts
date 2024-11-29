import { Response, Request } from "express";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";
import { LevelService } from "../../services/academy/LevelService";

export class LevelController {
  private readonly levelService: LevelService = new LevelService();
  protected readonly tag: string = "LevelController";

  public get getLevels() {
    return async (req: Request, res: Response) => {
      try {
        const levels = await this.levelService.findAll();
        if (levels.length === 0) {
          Responser.NOT_FOUND(res);
        } else {
          Responser.OK(res, levels);
        }
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Level",
            message: `Error getting levels: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Level",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }
}
