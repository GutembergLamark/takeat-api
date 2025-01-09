import { Router } from "express";
import { createRestaurantComposer } from "../../composers/usecases/createRestaurant.composer";
import { createRestaurantSchema } from "../../shared/schemas/restaurant.schema";
import { schemaComposer } from "../../composers/middlewares/schema.composer";
import { returnRestaurantsComposer } from "../../composers/usecases/returnRestaurants.composer";

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

  routes.get("/restaurants", function (request, response) {
    returnRestaurantsComposer(request, response);
  });

  return routes;
};
