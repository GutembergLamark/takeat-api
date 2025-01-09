import { Request, Response } from "express";

export default interface IReturnRestaurantsController {
  execute(request: Request, response: Response): Promise<Response>;
}
