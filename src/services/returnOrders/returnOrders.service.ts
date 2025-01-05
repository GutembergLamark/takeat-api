import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { IReturnOrdersService } from "./returnOrders.service.types";

export default class ReturnOrdersService implements IReturnOrdersService {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.findOrdersById(restaurantId);

    const products = restaurant?.orders;

    return products;
  }
}
