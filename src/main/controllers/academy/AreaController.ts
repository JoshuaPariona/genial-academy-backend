import { Request, Response } from "express";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";
import { AreaService } from "../../services/academy/AreaService";

export class AreaController {
  private readonly areaService: AreaService = new AreaService();
  protected readonly tag: string = "AreaController";

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
        const area = await this.areaService.find(uniId, areaId);
        if (!area) {
          Responser.NOT_FOUND(res, "Área no encontrada.");
          return;
        }
        if (!area.university) {
          Responser.NOT_FOUND(
            res,
            "Universidad no encontrada para el área dada."
          );
          return;
        }
        const parent1 = {
          name: area.university.acronym,
          link: `/${area.university.slug}`,
        };
        const parent0 = {
          name: area.name,
          link: `/${area.university.slug}/${area.slug}`,
        };
        Responser.OK(res, {
          ...area,
          university: undefined,
          path: [parent1, parent0],
        });
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