import * as dotenv from "dotenv";
import morgan from "morgan";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class AppConfig {
  constructor() {
    dotenv.config({
      path: this.envPath,
    });
  }

  private get envPath(): string {
    const envs: Array<string> = ["env"];
    if (this.nodeEnv) envs.unshift(...this.nodeEnv.split("."));
    return "." + envs.join(".");
  }

  public getEnvString(key: string): string | undefined {
    return process.env[key]?.trim();
  }

  public getEnvNumber(key: string): number {
    return Number(this.getEnvString(key));
  }

  public get nodeEnv(): string | undefined {
    return this.getEnvString("NODE_ENV");
  }

  public get typeORMConfig(): DataSourceOptions {
    return {
      type: "mysql",
      host: this.getEnvString("DB_HOST"),
      port: this.getEnvNumber("DB_PORT"),
      username: this.getEnvString("DB_USER"),
      password: this.getEnvString("DB_PASSWORD"),
      database: this.getEnvString("DB_DATABASE"),
      entities: [__dirname + "../../entities/*{.ts,.js}"],
      migrations: [__dirname + "../../migrations/*{.ts,.js}"],
      synchronize: true, //false
      //migrationsRun: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  public get morganFormat(): string {
    const getColor = (status: number): number => {
      if (status >= 500) {
        return 31;
      } else if (status >= 400) {
        return 33;
      } else if (status >= 300) {
        return 36;
      } else if (status >= 200) {
        return 32;
      } else {
        return 31;
      }
    };
    morgan.token("statusColor", (_, res, __) => {
      const status = res.statusCode;
      const color = getColor(status);
      return "\x1b[" + color + "m" + status + "\x1b[0m";
    });
    return "\x1b[32m[Api] \x1b[35m<:method>\x1b[0m :statusColor :url :response-time ms length=>:res[content-length]";
  }
}
