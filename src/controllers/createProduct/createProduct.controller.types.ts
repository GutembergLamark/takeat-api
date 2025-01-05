import { Request, Response } from "express";

export interface ICreateProductController {
  execute(request: Request, response: Response): Promise<Response>;
}
