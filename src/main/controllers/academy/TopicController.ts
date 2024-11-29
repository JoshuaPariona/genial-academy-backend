import { Request, Response } from "express";
import { TopicService } from "../../services/academy/TopicService";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";

export class TopicController {
  private readonly topicService: TopicService = new TopicService();
  protected readonly tag: string = "TopicController";

  public get getTopics() {
    return async (req: Request, res: Response) => {
      const { uniId, areaId, courseId } = req.params;
      try {
        const topics = await this.topicService.findAll(uniId, areaId, courseId);
        if (topics.length !== 0) {
          Responser.OK(res, topics);
        } else {
          Responser.NOT_FOUND(res);
        }
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Topic",
            message: `Error getting topics for course ${courseId}: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Topic",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }

  public get getTopic() {
    return async (req: Request, res: Response) => {
      const { uniId, areaId, courseId, topicId } = req.params;
      try {
        const topic = await this.topicService.find(
          uniId,
          areaId,
          courseId,
          topicId
        );
        if (!topic) {
          Responser.NOT_FOUND(res);
          return;
        }
        const parent3 = {
          name: topic.course.area.university.acronym,
          link: `/${topic.course.area.university.slug}`,
        };
        const parent2 = {
          name: topic.course.area.name,
          link: `/${topic.course.area.university.slug}/${topic.course.area.slug}`,
        };
        const parent1 = {
          name: topic.course.name,
          link: `/${topic.course.area.university.slug}/${topic.course.area.slug}/${topic.course.slug}`,
        };
        const parent0 = {
          name: topic.name,
          link: `/${topic.course.area.university.slug}/${topic.course.area.slug}/${topic.course.slug}/${topic.slug}`,
        };
        Responser.OK(res, {
          ...topic,
          course: undefined,
          path: [parent3, parent2, parent1, parent0],
        });
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Topic",
            message: `Error getting topic ${topicId} for course ${courseId}: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Topic",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }
}
