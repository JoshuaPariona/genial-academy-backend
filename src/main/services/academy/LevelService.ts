import { LevelEntity } from "../../entities/LevelEntity";
import { BaseService } from "../base/BaseService";

export class LevelService extends BaseService<LevelEntity> {
  constructor() {
    super(LevelEntity);
  }

  public findAll(): Promise<LevelEntity[]> {
    return this.repository.find();
  }
}
