import { Restaurant } from "../../infra/models";

export interface ICreateSessionService {
  execute(
    email: string,
    password: string,
  ): Promise<{ authorization: string; restaurant: Restaurant }>;
}
