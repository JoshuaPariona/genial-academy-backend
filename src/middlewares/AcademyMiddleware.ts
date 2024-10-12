import { Request, Response } from "express";

export class AcademyMiddleware {
  public getUniversityById(req: Request, res: Response) {
    res.status(200).json({
      email: "joshua@gmail.com",
    });
  }
}
