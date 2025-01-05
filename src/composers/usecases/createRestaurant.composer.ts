import { Request, Response } from "express";
import CreateRestaurantController from "../../controllers/createRestaurant/createRestaurant.controller";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import CreateRestaurantService from "../../services/createRestaurant/createRestaurant.service";
import { databaseConnection } from "../../infra/database/DatabaseConnection";

export async function createRestaurantComposer(
  request: Request,
  response: Response,
) {
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const createRestaurantService = new CreateRestaurantService(
    restaurantRepository,
  );
  const createRestaurantController = new CreateRestaurantController(
    createRestaurantService,
  );
  createRestaurantController.execute(request, response);
}
