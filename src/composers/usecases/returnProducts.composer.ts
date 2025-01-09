import { Request, Response } from "express";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import ReturnProductsService from "../../services/returnProducts/returnProducts.service";
import ReturnProductsController from "../../controllers/returnProducts/returnProducts.controller";

export async function returnProductsComposer(
  request: Request,
  response: Response,
) {
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const returnProductsService = new ReturnProductsService(restaurantRepository);
  const returnProductsController = new ReturnProductsController(
    returnProductsService,
  );
  returnProductsController.execute(request, response);
}
