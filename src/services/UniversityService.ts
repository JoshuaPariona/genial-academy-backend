import { UniversityEntity } from "../entities/UniversityEntity";
import { BaseService } from "./base/BaseService";

export class UniversityService extends BaseService<UniversityEntity> {
  constructor() {
    super(UniversityEntity);
  }

  public findAll(): Promise<UniversityEntity[]> {
    return this.repository.find({
      select: ["id", "slug", "name", "thumbnail", "acronym"],
    });
  }

  public findById(id: number): Promise<UniversityEntity | null> {
    return this.repository.findOneBy({ id });
  }

  public findBySlug(slug: string): Promise<UniversityEntity | null> {
    return this.repository.findOneBy({ slug });
  }
}
