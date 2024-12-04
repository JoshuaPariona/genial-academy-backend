import { UniversityEntity } from "../../entities/UniversityEntity";
import { BaseService } from "../../base/services/BaseService";


export class UniversityService extends BaseService<UniversityEntity> {
  constructor() {
    super(UniversityEntity);
  }

  public findAll(): Promise<UniversityEntity[]> {
    return this.repository.find({
      select: ["id", "slug", "name", "thumbnail", "acronym"],
      loadEagerRelations: false
    });
  }

  public find(uniId: string): Promise<UniversityEntity | null> {
    const isNumeric = !isNaN(Number(uniId));
    return this.repository.findOneBy(
      isNumeric ? { id: Number(uniId) } : { slug: uniId }
    );
  }
}
