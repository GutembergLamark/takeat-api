import { Request, Response } from "express";

import { catchError } from "../../shared/helpers/catchError";
import IRestaurantByIdService from "../../services/restaurantById/restaurantById.service.types";
import IRestaurantByIdController from "./restaurantById.controller.types";

export default class RestaurantByIdController
  implements IRestaurantByIdController
{
  constructor(private readonly restaurantByIdService: IRestaurantByIdService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request?.params;

    try {
      const restaurant = await this.restaurantByIdService.execute(id);

      return response.status(200).json({ restaurant });
    } catch (error) {
      return catchError(error, response);
    }
  }
}
