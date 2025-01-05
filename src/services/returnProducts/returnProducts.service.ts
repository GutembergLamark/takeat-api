import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import IReturnProductsService from "./returnProducts.service.types";

export default class ReturnProductsService implements IReturnProductsService {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.findProductsById(restaurantId);

    const products = restaurant?.products;

    return products;
  }
}
