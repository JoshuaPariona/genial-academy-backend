import { QuestionEntity } from "../../entities/QuestionEntity";
import { BaseService } from "../base/BaseService";

export class QuestionService extends BaseService<QuestionEntity> {
  constructor() {
    super(QuestionEntity);
  }

  public findQuery(
    uniId: string,
    areaId: string,
    courseId: string,
    topicId: string,
    levelName: string,
    count: number
  ): Promise<QuestionEntity[]> {
    const isNumericUniId = !isNaN(Number(uniId));
    const isNumericAreaId = !isNaN(Number(areaId));
    const isNumericCourseId = !isNaN(Number(courseId));
    const isNumericTopicId = !isNaN(Number(topicId));
    return this.repository.find({
      where: {
        level: {
          level: levelName
        },
        topic: {
          ...(isNumericTopicId ? { id: Number(topicId) } : { slug: topicId }),
          course: {
            ...(isNumericCourseId
              ? { id: Number(courseId) }
              : { slug: courseId }),
            area: {
              ...(isNumericAreaId ? { id: Number(areaId) } : { slug: areaId }),
              university: isNumericUniId
                ? { id: Number(uniId) }
                : { slug: uniId },
            },
          },
        },
      },
      take: count,
    });
  }
}
