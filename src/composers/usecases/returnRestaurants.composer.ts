import { Request, Response } from "express";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import ReturnRestaurantsController from "../../controllers/returnRestaurants/returnRestaurants.controller";
import ReturnRestaurantsService from "../../services/returnRestaurants/returnRestaurants.service";

export async function returnRestaurantsComposer(
  request: Request,
  response: Response,
) {
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const returnRestaurantsService = new ReturnRestaurantsService(
    restaurantRepository,
  );
  const returnRestaurantsController = new ReturnRestaurantsController(
    returnRestaurantsService,
  );
  returnRestaurantsController.execute(request, response);
}
