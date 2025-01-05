import { Request, Response } from "express";

export default interface IReturnProductsController {
  execute(request: Request, response: Response): Promise<Response>;
}
