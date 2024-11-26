import { Request, Response } from "express";
import { UniversityService } from "../services/UniversityService";
import { Responser } from "../utils/Responser";
import { Logger, LogLevel } from "../utils/Logger";

export class AcademySchemaController  {
  private readonly universityService: UniversityService =
    new UniversityService();
  protected readonly tag: string = "AcademyController";

  //----------------------------- Universities ---------------------------------

  public get getUniversities(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const data = await this.universityService.findAll();
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

  public get getUniversityByIdOrSlug(): (
    req: Request,
    res: Response
  ) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        let data = null;
        const n_id = Number(id);
        if (isNaN(n_id)) {
          data = await this.universityService.findBySlug(id);
        } else {
          data = await this.universityService.findById(n_id);
        }
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
            message: `Error getting university ${id}: ${error.message}`,
          });
        }
        else {
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
