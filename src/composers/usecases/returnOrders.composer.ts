import { Request, Response } from "express";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import ReturnOrdersService from "../../services/returnOrders/returnOrders.service";
import ReturnOrdersController from "../../controllers/returnOrders/returnOrders.controller";

export async function returnOrdersComposer(
  request: Request,
  response: Response,
) {
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const returnOrdersService = new ReturnOrdersService(restaurantRepository);
  const returnOrdersController = new ReturnOrdersController(
    returnOrdersService,
  );
  returnOrdersController.execute(request, response);
}
