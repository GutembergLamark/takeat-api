import { Router } from "express";
import { createRestaurantComposer } from "../../composers/usecases/createRestaurant.composer";
import { createRestaurantSchema } from "../../shared/schemas/restaurant.schema";
import { schemaComposer } from "../../composers/middlewares/schema.composer";

const routes = Router();

export const restaurantPublicRoutes = function () {
  routes.post(
    "/restaurants",
    function (request, response, next) {
      schemaComposer(request, response, next, createRestaurantSchema);
    },
    function (request, response) {
      createRestaurantComposer(request, response);
    },
  );

  return routes;
};
