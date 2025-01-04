import Restaurant from "../../../domain/Restaurant";

export enum FindType {
  email = "email",
  username = "username",
}

export interface IRestaurantRepository {
  create(restaurant: Restaurant): Promise<any>;
  verifyField(field: string, type: "email" | "username"): Promise<boolean>;
}
