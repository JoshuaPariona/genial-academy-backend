import { UserEntity } from "../../entities/UserEntity";
import { BaseService } from "../base/BaseService";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  public find(id: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({
      id,
    });
  }
}
