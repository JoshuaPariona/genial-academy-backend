import { DataSource, DataSourceOptions } from "typeorm";
import { Logger } from "../utils/Logger";

export class AppDataSource {
  private static dataSource: DataSource;
  private static readonly logger: Logger = new Logger("AppDataSource");

  public static async initialize(
    typeORMConfig: DataSourceOptions
  ): Promise<void> {
    if (!AppDataSource.dataSource) {
      AppDataSource.dataSource = new DataSource(typeORMConfig);
      try {
        AppDataSource.dataSource = await AppDataSource.dataSource.initialize();
        AppDataSource.logger.info("Database Connected", "Database");
      } catch (error) {
        AppDataSource.logger.error(
          `Database Connection Error: ${error}`,
          "Database"
        );
        throw error;
      }
    }
  }

  public static get instance(): DataSource {
    if (!AppDataSource.dataSource) {
      AppDataSource.logger.error(
        "Database Connection Error: DataSource not initialized. Call initialize() first.",
        "Database"
      );
      throw new Error();
    }
    return AppDataSource.dataSource;
  }
}
