import { Request, Response } from "express";
import Restaurant from "../../domain/Restaurant";
import { ICreateRestaurantService } from "../../services/createUSer/createRestaurant.types";
import { IcreateRestaurantController } from "./createRestaurant.controller.types";

export default class createRestaurantController
  implements IcreateRestaurantController
{
  constructor(
    private readonly createRestaurantService: ICreateRestaurantService
  ) {}

  async execute(request: Request, response: Response) {
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
        canceled_at
      );

      await this.createRestaurantService.execute(restaurant);

      return response
        .status(201)
        .json({ message: "Restaurant created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
