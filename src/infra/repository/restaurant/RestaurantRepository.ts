import Restaurant from "../../../domain/Restaurant";
import { IDatabaseConnection } from "../../database/DatabaseConnection";
import { FindType, IRestaurantRepository } from "./RestaurantRepository.types";

export default class RestaurantRepository implements IRestaurantRepository {
  constructor(readonly connection: IDatabaseConnection) {}

  async create(restaurant: Restaurant) {
    const connection = this.connection.getConnection();

    try {
      const restaurantModel = connection.models.Restaurant.build({
        restaurant,
      });
      return restaurantModel.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("An error occurred while creating the restaurant");
    }
  }

  async verifyField(
    field: string,
    type: "email" | "username"
  ): Promise<boolean> {
    const connection = this.connection.getConnection();
    const restaurantModel = connection.models.Restaurant;
    const findRestaurant = await restaurantModel.findOne({
      where: { [FindType[type]]: field },
    });

    return findRestaurant !== null;
  }
}
