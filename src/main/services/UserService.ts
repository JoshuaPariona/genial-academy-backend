import { DeepPartial } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { BaseService } from "./base/BaseService";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  public create(body: DeepPartial<UserEntity>): UserEntity {
    return this.repository.create(body);
  }
}
