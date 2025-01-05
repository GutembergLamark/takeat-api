import { Request, Response } from "express";

export default interface ICreateSessionController {
  execute(request: Request, response: Response): Promise<Response>;
}
