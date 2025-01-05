import { Request, Response } from "express";

export interface ICreateOrderController {
  execute(request: Request, response: Response): Promise<Response>;
}
