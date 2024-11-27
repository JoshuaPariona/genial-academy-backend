import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { AppConfig } from "./config/AppConfig";
import { Logger, LogLevel } from "./utils/Logger";
import { AppDataSource } from "./database/AppDataSource";
import { AcademySchemaRouter } from "./routers/AcademySchemaRouter";
import { UserSchemaRouter } from "./routers/UserSchemaRouter";
import { ApiKeyMiddleware } from "./auth/middlewares/ApiKeyMiddleware";
import { AuthRouter } from "./auth/router/AuthRouter";
import { LocalStrategy } from "./auth/strategies/LocalStrategy";
import { JwtStrategy } from "./auth/strategies/JwtStrategy";

export class App {
  private readonly tag: string = "App";
  private readonly app: express.Application = express();

  constructor() {
    AppConfig.initialize();
  }

  private setAppOptions() {
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
  }

  private setDevRouters() {
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerJsDoc(AppConfig.swaggerOptions))
    );
    this.app.get("/log", (req, res) => {
      const logs = Logger.logs;
      const max = Logger.max;
      res.render("logger", { logs, max });
    });
  }

  private setPassportStrategies() {
    passport.use(LocalStrategy.stgName, new LocalStrategy().getStrategy());
    passport.use(JwtStrategy.stgName, new JwtStrategy().getStrategy());
  }

  private setRootMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan(AppConfig.morganFormat, AppConfig.morganOptions));
    this.app.use(ApiKeyMiddleware.apiKey());
    this.app.use(passport.initialize());
  }

  private setAppRouters() {
    this.app.use("/auth", new AuthRouter().router);
    this.app.use("/api", [
      new AcademySchemaRouter().router,
      new UserSchemaRouter().router,
    ]);
  }

  private init() {
    const port = AppConfig.getEnvNumber("PORT");
    this.setAppOptions();
    this.setDevRouters();
    this.setPassportStrategies();
    this.setRootMiddlewares();
    this.setAppRouters();
    this.app.listen(port, () => {
      Logger.log({
        level: LogLevel.Info,
        tag: this.tag,
        feature: "Express",
        message: "App running on:",
        path: `http://localhost:${port}`,
      });
    });
  }

  public start() {
    Logger.log({
      level: LogLevel.Info,
      tag: this.tag,
      feature: "Express",
      message: "Starting genial-academy-backend express application",
    });
    AppDataSource.initialize()
      .then(() => {
        this.init();
      })
      .catch(() => {
        Logger.log({
          level: LogLevel.Warning,
          tag: this.tag,
          feature: "Express",
          message: "Shutting down genial-academy-backend express application",
        });
      });
  }
}
