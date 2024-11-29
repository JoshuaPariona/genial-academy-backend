import * as dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Logger, LogLevel } from "../utils/Logger";
import morgan from "morgan";
import { Request, Response } from "express";

export abstract class AppConfig {
  public static initialize() {
    dotenv.config({
      path: this.envPath,
    });
  }

  private static get envPath(): string {
    const envs: Array<string> = ["env"];
    const nodeEnv = process.env["NODE_ENV"];
    if (nodeEnv) envs.unshift(...nodeEnv.split("."));
    return "." + envs.join(".");
  }

  public static getEnvString(key: string): string {
    const value = process.env[key]?.trim();
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  public static getEnvNumber(key: string): number {
    return Number(this.getEnvString(key));
  }

  public static get typeORMConfig(): DataSourceOptions {
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

  public static get morganFormat(): string {
    return ":method$:status$:url$:response-time ms$:res[content-length]";
  }

  public static get morganOptions(): morgan.Options<Request, Response> {
    return {
      stream: {
        write: (message: string) => {
          const tokens = message.split("$");
          const status = Number(tokens[1]);
          let logLevel: LogLevel;

          if (status >= 500 || isNaN(status)) {
            logLevel = LogLevel.Error;
          } else if (status >= 400 && status < 500) {
            logLevel = LogLevel.Warning;
          } else if (status >= 300 && status < 400) {
            logLevel = LogLevel.Info;
          } else if (status >= 200 && status < 300) {
            logLevel = LogLevel.Log;
          } else {
            logLevel = LogLevel.Debug;
          }

          Logger.log({
            level: logLevel,
            tag: "Api",
            feature: tokens[0] ? tokens[0] : "Not method",
            message: "",
            status: tokens[1] ? tokens[1] : "Not status",
            path: tokens[2] ? tokens[2] : "Not path",
            duration: tokens[3] ? tokens[3] : "Not duration",
            weight: tokens[4] ? tokens[4] : "Not weight",
          });
        },
      },
    };
  }

  public static get swaggerOptions(): swaggerJSDoc.OAS3Options {
    return {
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "GenialAcademy API",
          version: "0.1.0",
          description: "Documentación de la API integrada en el servidor",
        },
        servers: [
          {
            url: `http://localhost:${this.getEnvNumber("PORT")}`,
            description: "Development",
          },
          {
            url: `http://google.engine:${this.getEnvNumber("PORT")}`,
            description: "Production",
          },
        ],
        components: {
          securitySchemes: {
            ApiKeyAuth: {
              type: "apiKey",
              name: "x-api-key",
              in: "header",
            },
            BearerAuth: {
              type: "http",
              name: "authorization",
              in: "header",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            ApiKeyAuth: [],
            BearerAuth: [],
          },
        ],
      },
      apis: ["./src/main/routers/**/*.ts", "./src/main/auth/router/*.ts"],
    };
  }
}
