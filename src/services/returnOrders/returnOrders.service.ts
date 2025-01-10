import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { AppError } from "../../shared/errors/AppError";
import { IReturnOrdersService } from "./returnOrders.service.types";

export default class ReturnOrdersService implements IReturnOrdersService {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.findOrdersById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 400);
    }

    const products = restaurant?.orders ?? [];

    return products;
  }
}
