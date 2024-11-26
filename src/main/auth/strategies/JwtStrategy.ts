import {
  Strategy,
  VerifyCallback,
  VerifiedCallback,
  ExtractJwt,
} from "passport-jwt";
import { AppConfig } from "../../config/AppConfig";
import { JwtPayload } from "../interfaces";
import { AuthService } from "../services/AuthService";

export class JwtStrategy {
  private readonly authService = new AuthService();
  public static readonly stgName = "jwt";


  private readonly verify: VerifyCallback = async (
    payload: JwtPayload,
    done: VerifiedCallback
  ) => {
    const authUser = await this.authService.findById(payload.sub);
    if (authUser) {
      return done(null, authUser);
    }
    return done(null, false, { message: "Token inválido" });
  };

  public getStrategy() {
    return new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: AppConfig.getEnvString("JWT_SECRET"),
      },
      this.verify
    );
  }
}
