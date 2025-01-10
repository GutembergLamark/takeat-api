import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import IReturnRestaurantsService from "./returnRestaurants.service.types";

export default class ReturnRestaurantsService
  implements IReturnRestaurantsService
{
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute() {
    const restaurants = await this.restaurantRepository.findAllRestaurants();

    return restaurants;
  }
}
