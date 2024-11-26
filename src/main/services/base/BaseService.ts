import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "../../entities/base/BaseEntity";
import { AppDataSource } from "../../database/AppDataSource";

export class BaseService<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(entityTarget: EntityTarget<T>) {
    this.repository = AppDataSource.instance.getRepository(entityTarget);
  }
}
