import { Request, Response } from "express";
import { CourseService } from "../../services/academy/CourseService";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";

export class CourseController {
  private readonly courseService: CourseService = new CourseService();
  protected readonly tag: string = "CourseController";
  
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
}