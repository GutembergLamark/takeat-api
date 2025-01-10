import { Request, Response } from "express";

import { catchError } from "../../shared/helpers/catchError";
import IReturnRestaurantsService from "../../services/returnRestaurants/returnRestaurants.service.types";
import IReturnRestaurantsController from "./returnRestaurants.controller.types";

export default class ReturnRestaurantsController
  implements IReturnRestaurantsController
{
  constructor(
    private readonly returnRestaurantsService: IReturnRestaurantsService,
  ) {}

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const restaurants = await this.returnRestaurantsService.execute();

      return response.status(200).json({ restaurants });
    } catch (error) {
      return catchError(error, response);
    }
  }
}
