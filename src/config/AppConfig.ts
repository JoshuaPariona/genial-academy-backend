import * as dotenv from "dotenv";
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
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()
    };
  }
}
