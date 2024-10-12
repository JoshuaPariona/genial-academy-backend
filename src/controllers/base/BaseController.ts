import { Response } from "express";
import { Logger } from "../../utils/Logger";

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class BaseController {
  protected readonly logger: Logger;

  constructor(tag: string) {
    this.logger = new Logger(tag);
  }

  protected OK(res: Response, data: any, msg?: string): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      msg,
      data,
    });
  }

  protected CREATED(res: Response, data: any, msg?: string): Response {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      msg,
      data,
    });
  }

  protected BAD_REQUEST(res: Response, msg?: string) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      msg,
    });
  }

  protected NOT_FOUND(res: Response, msg?: string): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      msg,
    });
  }

  protected INTERNAL_SERVER_ERROR(
    res: Response,
    error: string,
    msg?: string
  ): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      msg,
      error,
    });
  }
}
