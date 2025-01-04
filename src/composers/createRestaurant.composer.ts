import { Request, Response } from "express";
import createRestaurantController from "../controllers/restaurant/createRestaurant.controller";
import RestaurantRepository from "../infra/repository/restaurant/RestaurantRepository";
import CreateRestaurantService from "../services/createUSer/createRestaurant.service";
import { databaseConnection } from "../app";

export async function createRestaurantComposer(
  request: Request,
  response: Response
) {
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const createUserService = new CreateRestaurantService(restaurantRepository);
  const createUserController = new createRestaurantController(
    createUserService
  );
  createUserController.execute(request, response);
}
