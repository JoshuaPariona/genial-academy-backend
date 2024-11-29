import { UserService } from "../../services/UserService";

export class UserSchemaController {
  private readonly userService: UserService = new UserService();
  protected readonly tag: string = "UserController";

  
}