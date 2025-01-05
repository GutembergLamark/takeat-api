import { Request, Response } from "express";
import { ISession } from "../../@types/models/Session";
import { ICreateSessionService } from "../../services/createSession/createSession.service.types";
import ICreateSessionController from "./createSession.controller.types";
import { AppError } from "../../shared/errors/AppError";
import { catchError } from "../../shared/helpers/catchError";

export default class CreateSessionController
  implements ICreateSessionController
{
  constructor(private readonly createSessionService: ICreateSessionService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.validatedBody as ISession;

    try {
      const { authorization, restaurant } =
        await this.createSessionService.execute(email, password);

      return response.status(200).json({ ...restaurant, authorization });
    } catch (error) {
      return catchError(error, response);
    }
  }
}
