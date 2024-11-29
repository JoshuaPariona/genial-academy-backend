import { CourseEntity } from "../../entities/CourseEntity";
import { BaseService } from "../base/BaseService";

export class CourseService extends BaseService<CourseEntity> {
  constructor() {
    super(CourseEntity);
  }
  public findAll(uniId: string, areaId: string): Promise<CourseEntity[]> {
    const isNumericUniId = !isNaN(Number(uniId));
    const isNumericAreaId = !isNaN(Number(areaId));
    return this.repository.find({
      where: {
        area: {
          ...(isNumericAreaId ? { id: Number(areaId) } : { slug: areaId }),
          university: isNumericUniId ? { id: Number(uniId) } : { slug: uniId },
        },
      },
      select: ["id", "slug", "thumbnail", "name"],
      loadEagerRelations: false,
    });
  }

  public find(
    uniId: string,
    areaId: string,
    courseId: string
  ): Promise<CourseEntity | null> {
    const isNumericUniId = !isNaN(Number(uniId));
    const isNumericAreaId = !isNaN(Number(areaId));
    const isNumericCourseId = !isNaN(Number(courseId));
    return this.repository.findOneBy({
      ...(isNumericCourseId ? { id: Number(courseId) } : { slug: courseId }),
      area: {
        ...(isNumericAreaId ? { id: Number(areaId) } : { slug: areaId }),
        university: isNumericUniId ? { id: Number(uniId) } : { slug: uniId },
      },
    });
  }
}
