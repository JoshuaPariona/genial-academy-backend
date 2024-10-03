import { Request, Response } from "express";

export class AuthUserController {
  public getAuthUser(req: Request, res: Response) {
    res.status(200).json({
      email: "joshua@gmail.com",
    });
  }
}
