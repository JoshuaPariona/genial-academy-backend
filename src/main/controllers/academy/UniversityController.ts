import { Response, Request } from "express";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";
import { UniversityService } from "../../services/academy/UniversityService";

export class UniversityController {
  private readonly universityService: UniversityService =
    new UniversityService();
  protected readonly tag: string = "UniversityController";

  public get getUniversities() {
    return async (req: Request, res: Response) => {
      try {
        const universities = await this.universityService.findAll();
        if (universities.length === 0) {
          Responser.NOT_FOUND(res);
        } else {
          Responser.OK(res, universities);
        }
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "University",
            message: `Error getting universities: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "University",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get getUniversity() {
    return async (req: Request, res: Response) => {
      const { uniId } = req.params;
      try {
        const data = await this.universityService.find(uniId);
        if (data) {
          Responser.OK(res, data);
        } else {
          Responser.NOT_FOUND(res);
        }
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "University",
            message: `Error getting university ${uniId}: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "University",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }
}
