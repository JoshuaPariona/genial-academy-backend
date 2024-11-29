import { Request, Response } from "express";
import { UniversityService } from "../services/UniversityService";
import { Responser } from "../utils/Responser";
import { Logger, LogLevel } from "../utils/Logger";
import { AreaService } from "../services/AreaService";
import { CourseService } from "../services/CourseService";

export class AcademySchemaController {
  private readonly universityService: UniversityService =
    new UniversityService();
  private readonly areaService: AreaService = new AreaService();
  private readonly courseService: CourseService = new CourseService();
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

  //------------------------- Courses ------------------------------------

  public get getCourses() {
    return async (req: Request, res: Response) => {
      const { uniId, areaId } = req.params;
      try {
        const data = await this.courseService.findAll(uniId, areaId);
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
            feature: "Course",
            message: `Error getting courses for area ${areaId}: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Course",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get getCourse() {
    return async (req: Request, res: Response) => {
      const { uniId, areaId, courseId } = req.params;
      try {
        const course = await this.courseService.find(uniId, areaId, courseId);
        if (!course) {
          Responser.NOT_FOUND(res);
          return;
        }
        const parent2 = {
          name: course.area.university.acronym,
          link: `/${course.area.university.slug}`,
        };
        const parent1 = {
          name: course.area.name,
          link: `/${course.area.university.slug}/${course.area.slug}`,
        };
        const parent0 = {
          name: course.name,
          link: `/${course.area.university.slug}/${course.area.slug}/${course.slug}`,
        };
        Responser.OK(res, {
          ...course,
          area: undefined,
          path: [parent2, parent1, parent0],
        });
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Course",
            message: `Error getting course ${courseId} for area ${areaId}: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Course",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  //------------------------- Topics ------------------------------------
}
