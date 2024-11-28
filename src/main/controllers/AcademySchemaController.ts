import { Request, Response } from "express";
import { UniversityService } from "../services/UniversityService";
import { Responser } from "../utils/Responser";
import { Logger, LogLevel } from "../utils/Logger";
import { AreaService } from "../services/AreaService";

export class AcademySchemaController {
  private readonly universityService: UniversityService =
    new UniversityService();
  private readonly areaService: AreaService = new AreaService();
  protected readonly tag: string = "AcademyController";

  //---------------------- Universities ---------------------------------

  public get getUniversities() {
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

  //------------------------- Areas --------------------------------------

  public get getAreas() {
    return async (req: Request, res: Response) => {
      const { uniId } = req.params;
      try {
        const data = await this.areaService.findAll(uniId);
        if (data.length !== 0) {
          Responser.OK(res, data);
        } else {
          Responser.NOT_FOUND(res);
        }
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Area",
            message: `Error getting areas for university ${uniId}: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Area",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get getArea() {
    return async (req: Request, res: Response) => {
      const { uniId, areaId } = req.params;
      try {
        const data = await this.areaService.find(uniId, areaId);
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
            feature: "Area",
            message: `Error getting area ${areaId} for university ${uniId}: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Area",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }
}
