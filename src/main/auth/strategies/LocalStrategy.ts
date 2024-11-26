import { Strategy, VerifyFunction } from "passport-local";
import { AuthService } from "../services/AuthService";

export class LocalStrategy {
  private readonly authService = new AuthService();
  public static readonly stgName = "local";

  private readonly verify: VerifyFunction = async (
    identifier,
    password,
    done
  ) => {
    const authUser = await this.authService.validateUser(identifier, password);
    if (authUser) {
      return done(null, authUser);
    }
    return done(null, false, { message: "Identificador o contraseña errorea" });
  };

  public getStrategy() {
    return new Strategy(
      { usernameField: "identifier", passwordField: "password" },
      this.verify
    );
  }
}
