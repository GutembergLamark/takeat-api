import { Request, Response } from "express";

export default interface IReturnOrdersController {
  execute(request: Request, response: Response): Promise<Response>;
}
