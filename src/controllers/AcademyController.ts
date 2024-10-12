import { Request, Response } from "express";
import { UniversityService } from "../services/UniversityService";
import { BaseController } from "./base/BaseController";

export class AcademyController extends BaseController {
  private readonly universityService: UniversityService =
    new UniversityService();

  constructor() {
    super("AcademyController");
  }

  //----------------------------- Universities ---------------------------------

  public async getUniversities(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.universityService.findAll();
      if (data.length === 0) {
        return this.NOT_FOUND(res);
      }
      return this.OK(res, data);
    } catch (error) {
      this.logger.error(`Error getting universities: ${error}`, "University");
      return this.INTERNAL_SERVER_ERROR(res, String(error));
    }
  }

  public async getUniversityById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    try {
      const data = await this.universityService.findById(Number(id));
      if (data) {
        return this.OK(res, data);
      }
      return this.NOT_FOUND(res);
    } catch (error) {
      this.logger.error(
        `Error getting university ${id}: ${error}`,
        "University"
      );
      return this.INTERNAL_SERVER_ERROR(res, String(error));
    }
  }

  public async postUniversity(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.universityService.create(req.body);
      if (data) {
        return this.CREATED(res, data);
      }
      return this.BAD_REQUEST(res);
    } catch (error) {
      this.logger.error(`Error creating university: ${error}`, "University");
      return this.INTERNAL_SERVER_ERROR(res, String(error));
    }
  }
}
