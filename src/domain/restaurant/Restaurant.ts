import { RestaurantJSON } from "./Restaurant.types";

export default class Restaurant {
  constructor(
    public readonly username: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly password: string,
    public readonly address: string,
    public readonly has_service_tax: boolean,
  ) {}

  toJSON(): RestaurantJSON {
    return {
      username: this.username,
      phone: this.phone,
      email: this.email,
      password: this.password,
      address: this.address,
      has_service_tax: this.has_service_tax,
    };
  }
}
