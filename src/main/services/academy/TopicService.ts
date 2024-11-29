import { TopicEntity } from "../../entities/TopicEntity";
import { BaseService } from "../base/BaseService";

export class TopicService extends BaseService<TopicEntity> {
  constructor() {
    super(TopicEntity);
  }

  public findAll(
    uniId: string,
    areaId: string,
    courseId: string
  ): Promise<TopicEntity[]> {
    const isNumericUniId = !isNaN(Number(uniId));
    const isNumericAreaId = !isNaN(Number(areaId));
    const isNumericCourseId = !isNaN(Number(courseId));
    return this.repository.find({
      where: {
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
      select: ["id", "slug", "thumbnail", "name"],
      loadEagerRelations: false,
    });
  }

  public find(
    uniId: string,
    areaId: string,
    courseId: string,
    topicId: string
  ): Promise<TopicEntity | null> {
    const isNumericUniId = !isNaN(Number(uniId));
    const isNumericAreaId = !isNaN(Number(areaId));
    const isNumericCourseId = !isNaN(Number(courseId));
    const isNumericTopicId = !isNaN(Number(topicId));
    return this.repository.findOneBy({
      ...(isNumericTopicId ? { id: Number(topicId) } : { slug: topicId }),
      course: {
        ...(isNumericCourseId ? { id: Number(courseId) } : { slug: courseId }),
        area: {
          ...(isNumericAreaId ? { id: Number(areaId) } : { slug: areaId }),
          university: isNumericUniId ? { id: Number(uniId) } : { slug: uniId },
        },
      },
    });
  }
}
