import { Router } from "express";
import createRestaurantController from "../../controllers/restaurant/createRestaurant.controller";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import CreateRestaurantService from "../../services/createUSer/createRestaurant.service";
import { databaseConnection } from "../../app";
import { createRestaurantComposer } from "../../composers/createRestaurant.composer";
import ValidateRequest from "../../middlewares/ValidateRequest.middleware";
import { createRestaurantSchema } from "../../controllers/schemas/restaurant.schema";
import { schemaComposer } from "../../composers/schema.composer";

const routes = Router();

export const restaurantPublicRoutes = function () {
  routes.post(
    "/restaurants",
    function (request, response, next) {
      schemaComposer(request, response, next, createRestaurantSchema);
    },
    function (request, response) {
      createRestaurantComposer(request, response);
    }
  );

  return routes;
};
