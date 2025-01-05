import { compare } from "bcrypt";
import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { Restaurant } from "../../infra/models";
import { AppError } from "../../shared/errors/AppError";

export default class CreateSessionService {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ authorization: string; restaurant: Restaurant }> {
    const restaurant = await this.restaurantRepository.findByEmail(email);

    if (!restaurant) {
      throw new AppError("Invalid restaurant or password", 403);
    }

    const passwordMatch = await compare(password, restaurant.password!);

    if (!passwordMatch) {
      throw new AppError("Invalid restaurant or password", 403);
    }

    const authorization = sign(
      { email: restaurant.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
        subject: restaurant.id,
      },
    );

    delete restaurant.password;

    return { restaurant, authorization };
  }
}
