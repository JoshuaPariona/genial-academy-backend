import { DeepPartial } from "typeorm";
import { AuthUserEntity } from "../entities/AuthUserEntity";
import { BaseService } from "../base/services/BaseService";

export class AuthUserService extends BaseService<AuthUserEntity> {
  constructor() {
    super(AuthUserEntity);
  }

  protected create(authUser: DeepPartial<AuthUserEntity>): AuthUserEntity {
    return this.repository.create(authUser);
  }

  protected save(
    authUser: DeepPartial<AuthUserEntity>
  ): Promise<AuthUserEntity> {
    authUser.user = {
      ...authUser,
      publicEmail: authUser.email,
    };
    const aUser = this.repository.create(authUser);
    return this.repository.save(aUser);
  }

  public isEmailUsed(email: string): Promise<boolean> {
    return this.repository.existsBy({ email });
  }

  public isUsernameUsed(username: string): Promise<boolean> {
    return this.repository.existsBy({ username });
  }

  public findById(id: string): Promise<AuthUserEntity | null> {
    return this.repository.findOneBy({ id });
  }

  public findByEmail(email: string): Promise<AuthUserEntity | null> {
    return this.repository.findOneBy({ email });
  }

  public findByUserName(username: string): Promise<AuthUserEntity | null> {
    return this.repository.findOneBy({ username });
  }
}
