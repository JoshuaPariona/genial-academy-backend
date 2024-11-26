import { Response } from "express";

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class Responser {
  public static OK(
    res: Response,
    data: any,
    msg?: string | string[]
  ): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      msg,
      data,
    });
  }

  public static CREATED(res: Response, data: any, msg?: string | string[]) {
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      msg,
      data,
    });
  }

  public static BAD_REQUEST(res: Response, msg?: string | string[]) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      msg,
    });
  }

  public static UNAUTHORIZED(res: Response, msg?: string | string[]) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      msg,
    });
  }

  public static NOT_FOUND(res: Response, msg?: string | string[]) {
    res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      msg,
    });
  }

  public static FORBIDDEN(res: Response, msg?: string | string[]) {
    res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      msg,
    });
  }

  public static INTERNAL_SERVER_ERROR(
    res: Response,
    error: string,
    msg?: string | string[]
  ) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      msg,
      error,
    });
  }
}
