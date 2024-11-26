import { DataSource } from "typeorm";
import { Logger, LogLevel } from "../utils/Logger";
import { AppConfig } from "../config/AppConfig";

export class AppDataSource {
  private static dataSource: DataSource;
  private static readonly tag: string = "AppDataSource";

  public static async initialize(): Promise<void> {
    if (!this.dataSource) {
      try {
        this.dataSource = new DataSource(AppConfig.typeORMConfig);
        this.dataSource = await this.dataSource.initialize();
        Logger.log({
          level: LogLevel.Info,
          tag: this.tag,
          feature: "Database",
          message: "Database Connected",
        });
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Database",
            message: `Database Connection Error: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Database",
            message: `Unknown Error: ${error}`,
          });
        }
        throw error;
      }
    }
  }

  public static get instance(): DataSource {
    if (!this.dataSource) {
      Logger.log({
        level: LogLevel.Error,
        tag: this.tag,
        feature: "Database",
        message:
          "Database Connection Error: DataSource not initialized. Call initialize() first.",
      });
      throw new Error(
        "Database Connection Error: DataSource not initialized. Call initialize() first."
      );
    }
    return this.dataSource;
  }
}
