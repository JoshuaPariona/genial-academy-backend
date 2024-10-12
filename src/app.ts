import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AcademyRouter } from "./routers/AcademyRouter";
import { AppConfig } from "./config/AppConfig";
import { Logger } from "./utils/Logger";
import { AppDataSource } from "./database/AppDataSource";

export class App extends AppConfig {
  private readonly logger: Logger = new Logger("App");
  private readonly app: express.Application = express();
  private readonly port: number = this.getEnvNumber("PORT");

  constructor() {
    super();
  }

  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan(this.morganFormat));
    this.app.use(cors());
  }

  private setRouters() {
    this.app.use("/api", new AcademyRouter().router);
  }

  public start() {
    this.logger.info(
      "Starting genial-academy-backend express application",
      "Express"
    );
    AppDataSource.initialize(this.typeORMConfig)
      .then(() => {
        this.setMiddlewares();
        this.setRouters();
        this.app.listen(this.port, () => {
          this.logger.info(
            "App running on",
            "Express",
            `http://localhost:${this.port}`
          );
        });
      })
      .catch(() => {
        this.logger.info(
          "Shutting down genial-academy-backend express application",
          "Express"
        );
      });
  }
}
