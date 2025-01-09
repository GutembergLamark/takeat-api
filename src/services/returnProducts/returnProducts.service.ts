import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { AppError } from "../../shared/errors/AppError";
import IReturnProductsService from "./returnProducts.service.types";

export default class ReturnProductsService implements IReturnProductsService {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.findProductsById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 400);
    }

    const products = restaurant?.products;

    return products;
  }
}
