import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthUserEntity } from "../../entities/AuthUserEntity";
import { AuthUserService } from "../../services/AuthUserService";
import { AppConfig } from "../../config/AppConfig";
import { JwtJson, JwtPayload } from "../interfaces";
import { SignUpUserDTO } from "../validations/dto/SignUpUserDTO";

export class AuthService extends AuthUserService {
  constructor() {
    super();
  }

  public async validateUser(
    identifier: string,
    password: string
  ): Promise<AuthUserEntity | null> {
    let authUser = await this.findByEmail(identifier);
    if (!authUser) {
      authUser = await this.findByUserName(identifier);
    }
    if (authUser) {
      if (await bcrypt.compare(password, authUser.passwordHash))
        return authUser;
    }
    return null;
  }

  public async saveAuthUserWithUser(
    signUpDto: SignUpUserDTO
  ): Promise<AuthUserEntity> {
    const passwordHash = await bcrypt.hash(signUpDto.password, 10);
    return await this.save({
      ...signUpDto,
      passwordHash,
    });
  }

  public async generateJwt(authUser: AuthUserEntity): Promise<JwtJson> {
    const payload: JwtPayload = {
      sub: authUser.id,
      role: authUser.role,
    };
    return {
      accessToken: jwt.sign(payload, AppConfig.getEnvString("JWT_SECRET")),
      user: authUser.user,
    };
  }
}
