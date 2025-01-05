import Restaurant from "../../../domain/restaurant/Restaurant";

export enum FindType {
  email = "email",
  username = "username",
}

export interface IRestaurantRepository {
  create(restaurant: Restaurant): Promise<any>;
  existingInRepository(
    field: string,
    type: "email" | "username",
  ): Promise<boolean>;
  findById(id: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findProductsById(id: string): Promise<any>;
}
