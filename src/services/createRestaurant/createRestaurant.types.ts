import RestaurantDomain from "../../domain/restaurant/Restaurant";
import { Restaurant } from "../../infra/models";

export interface ICreateRestaurantService {
  execute(restaurant: RestaurantDomain): Promise<Restaurant>;
}
