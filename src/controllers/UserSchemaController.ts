import { Request, Response } from "express";
import { Responser } from "../utils/Responser";
import { Logger, LogLevel } from "../utils/Logger";
import { UserService } from "../services/UserService";

export class UserSchemaController {
  private readonly userService: UserService = new UserService();
  protected readonly tag: string = "UserController";

  
}