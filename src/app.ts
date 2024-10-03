import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AuthUserRouter } from "./routers/AuthUserRouter";
import { AppConfig } from "./config/AppConfig";
import { DataSource } from "typeorm";

class AppInitializer extends AppConfig {
  public app: express.Application = express();
  private port: number = this.getEnvNumber("PORT");

  constructor() {
    super();
    this.init();
    this.dbConnection();
  }

  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      morgan(
        "[API] :method :url :status :res[content-length] - :response-time ms"
      )
    );
    this.app.use(cors());
  }

  private setRouters() {
    this.app.use("/api", [new AuthUserRouter().router]);
  }

  private async dbConnection(): Promise<void> {
    try {
      const dataSource = new DataSource(this.typeORMConfig);
      await dataSource.initialize();
      console.info("[Database] Database Connected");

      this.setMiddlewares();
      this.setRouters();

      this.app.listen(this.port, () => {
        console.info(`[Express] App running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error(`[Database] Database Connection Error: ${error}`);
      console.info(
        "[Express] Shutting down genial-academy-backend express application"
      );
    }
  }

  public init() {
    console.info(
      "[Express] Starting genial-academy-backend express application"
    );
  }
}

new AppInitializer();
