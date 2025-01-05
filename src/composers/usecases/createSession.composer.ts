import { Request, Response } from "express";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import CreateSessionController from "../../controllers/createSession/createSession.controller";
import CreateSessionService from "../../services/createSession/createSession.service";

export async function createSessionComposer(
  request: Request,
  response: Response,
) {
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const createSessionService = new CreateSessionService(restaurantRepository);
  const createSessionController = new CreateSessionController(
    createSessionService,
  );
  createSessionController.execute(request, response);
}
