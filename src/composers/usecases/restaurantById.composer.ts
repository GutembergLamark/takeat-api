import { Request, Response } from "express";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import RestaurantByIdService from "../../services/restaurantById/restaurantById.service";
import RestaurantByIdController from "../../controllers/restaurantById/restaurantById.controller";

export async function restaurantByIdComposer(
  request: Request,
  response: Response,
) {
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const restaurantByIdService = new RestaurantByIdService(restaurantRepository);
  const restaurantByIdController = new RestaurantByIdController(
    restaurantByIdService,
  );
  restaurantByIdController.execute(request, response);
}
