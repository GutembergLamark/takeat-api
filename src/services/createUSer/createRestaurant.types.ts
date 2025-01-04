import Restaurant from "../../domain/Restaurant";

export interface ICreateRestaurantService {
  execute(restaurant: Restaurant): Promise<Restaurant>;
}
