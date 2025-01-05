import RestaurantDomain from "../../domain/restaurant/Restaurant";
import { Restaurant } from "../../infra/models";
import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { AppError } from "../../shared/errors/AppError";
import { ICreateRestaurantService } from "./createRestaurant.types";

export default class CreateRestaurantService
  implements ICreateRestaurantService
{
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(restaurant: RestaurantDomain): Promise<Restaurant> {
    const existsRestaurantWithUsername =
      await this.restaurantRepository.existingInRepository(
        restaurant.username,
        "username",
      );

    const existsRestaurantWithEmail =
      await this.restaurantRepository.existingInRepository(
        restaurant.email,
        "email",
      );

    const restaurantExists =
      existsRestaurantWithUsername || existsRestaurantWithEmail;

    if (restaurantExists) {
      throw new AppError("Restaurant already exists", 400);
    }

    const restaurantCreated =
      await this.restaurantRepository.create(restaurant);

    const restaurantInstance = await this.restaurantRepository.findById(
      restaurantCreated.id as string,
    );

    return restaurantInstance;
  }
}
