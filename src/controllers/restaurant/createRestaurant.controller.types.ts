import { Request, Response } from "express";

export interface IcreateRestaurantController {
  execute(request: Request, response: Response): Promise<Response>;
}
