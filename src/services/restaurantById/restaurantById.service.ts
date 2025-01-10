import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { AppError } from "../../shared/errors/AppError";
import IRestaurantByIdService from "./restaurantById.service.types";

export default class RestaurantByIdService implements IRestaurantByIdService {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(id: string) {
    const restaurant = await this.restaurantRepository.findById(id);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 400);
    }

    return restaurant;
  }
}
