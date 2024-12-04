import { UpdateResult } from "typeorm";
import { UserEntity } from "../../entities/UserEntity";
import { BaseService } from "../../base/services/BaseService";
import { UpdateUserCoinsDTO } from "../../validations/dto/UpdateUserCoinsDTO";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  public find(id: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({
      id,
    });
  }

  public update(id: string, user: Partial<UserEntity>): Promise<UpdateResult> {
    return this.repository.update(
      {
        id,
      },
      user
    );
  }

  public updateCoins(
    id: string,
    currentCoins: number,
    actionDTO: UpdateUserCoinsDTO
  ): Promise<UpdateResult> | null {
    let coins = actionDTO.coins;
    if (actionDTO.action == "decrement") {
      coins = -coins;
      if (currentCoins + coins < 0) {
        return null;
      }
    }
    return this.repository.update(
      {
        id,
      },
      {
        coins: currentCoins + coins,
      }
    );
  }
}
