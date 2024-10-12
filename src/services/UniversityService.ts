import { UniversityEntity } from "../entities/UniversityEntity";
import { BaseService } from "./base/BaseService";

export class UniversityService extends BaseService<UniversityEntity> {
  constructor() {
    super(UniversityEntity);
  }

  public async findAll(): Promise<UniversityEntity[]> {
    return this.repository.find();
  }

  public async findById(id: number): Promise<UniversityEntity | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  public async create(body: any): Promise<UniversityEntity | null> {
    return this.repository.save(body);
  }
}
