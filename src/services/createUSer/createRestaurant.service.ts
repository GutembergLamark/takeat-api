import Restaurant from "../../domain/Restaurant";
import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { ICreateRestaurantService } from "./createRestaurant.types";

export default class CreateRestaurantService
  implements ICreateRestaurantService
{
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(restaurant: Restaurant) {
    const existsRestaurantWithUsername =
      await this.restaurantRepository.verifyField(
        restaurant.username,
        "username"
      );

    const existsRestaurantWithEmail =
      await this.restaurantRepository.verifyField(restaurant.email, "email");

    const restaurantExists =
      existsRestaurantWithUsername || existsRestaurantWithEmail;

    if (restaurantExists) {
      throw new Error("Restaurant already exists");
    }

    return await this.restaurantRepository.create(restaurant);
  }
}
