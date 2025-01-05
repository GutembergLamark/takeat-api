import { Request, Response } from "express";
import Restaurant from "../../domain/restaurant/Restaurant";
import { ICreateRestaurantService } from "../../services/createRestaurant/createRestaurant.types";
import { IcreateRestaurantController } from "./createRestaurant.controller.types";
import { AppError } from "../../shared/errors/AppError";
import { catchError } from "../../shared/helpers/catchError";

export default class CreateRestaurantController
  implements IcreateRestaurantController
{
  constructor(
    private readonly createRestaurantService: ICreateRestaurantService,
  ) {}

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const {
        username,
        phone,
        email,
        password,
        address,
        has_service_tax,
        canceled_at,
      } = request.validatedBody as Restaurant;

      const restaurant = new Restaurant(
        username,
        phone,
        email,
        password,
        address,
        has_service_tax,
        canceled_at,
      );

      const data = await this.createRestaurantService.execute(restaurant);

      return response.status(201).json({
        message: "Restaurant created successfully",
        data,
      });
    } catch (error) {
      return catchError(error, response);
    }
  }
}
