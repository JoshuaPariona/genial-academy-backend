import { Response, Request } from "express";
import { Responser } from "../../utils/Responser";
import { Logger, LogLevel } from "../../utils/Logger";
import { QuestionService } from "../../services/academy/QuestionService";

export class QuestionController {
  private readonly questionService: QuestionService = new QuestionService();
  protected readonly tag: string = "QuestionController";

  public get getQuestions() {
    return async (req: Request, res: Response) => {
      const { uniId, areaId, courseId, topicId } = req.params;
      const { level, count } = req.query;
      try {
        if (!level) {
          Responser.BAD_REQUEST(
            res,
            "Se debe proporcionar el nivel de las preguntas."
          );
          return;
        }
        if (!["basic", "intermediate", "advance"].includes(level.toString())) {
          Responser.BAD_REQUEST(res, "Nombre de nivel no permitido.");
          return;
        }
        let questionCount;
        if (!count) {
          questionCount = 7;
        } else {
          if (isNaN(Number(count))) {
            Responser.BAD_REQUEST(
              res,
              "El número de preguntas debe ser un número válido."
            );
            return;
          }
          questionCount = Number(count);
        }
        const questions = await this.questionService.findQuery(
          uniId,
          areaId,
          courseId,
          topicId,
          level?.toString(),
          questionCount || 7
        );
        if (questions.length === 0) {
          Responser.NOT_FOUND(res);
        } else {
          Responser.OK(res, questions);
        }
      } catch (error) {
        if (error instanceof Error) {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Questions",
            message: `Error getting questions: ${error.message}`,
          });
        } else {
          Logger.log({
            level: LogLevel.Error,
            tag: this.tag,
            feature: "Questions",
            message: `Unknown Error: ${error}`,
          });
        }
        Responser.INTERNAL_SERVER_ERROR(res, String(error));
      }
    };
  }
}
