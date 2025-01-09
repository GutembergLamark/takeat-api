import { Request, Response } from "express";

export default interface IRestaurantByIdController {
  execute(request: Request, response: Response): Promise<Response>;
}
