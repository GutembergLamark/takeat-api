import { Router } from "express";
import { authComposer } from "../../composers/middlewares/auth.composer";
import { schemaComposer } from "../../composers/middlewares/schema.composer";
import { createProductSchema } from "../../shared/schemas/product.schema";
import { createProductComposer } from "../../composers/usecases/createProduct.composer";
import { returnProductsComposer } from "../../composers/usecases/returnProducts.composer";

const routes = Router();

export const restaurantRoutes = function () {
  routes.post(
    "/products",
    function (request, response, next) {
      authComposer(request, response, next);
    },
    function (request, response, next) {
      schemaComposer(request, response, next, createProductSchema);
    },
    function (request, response) {
      createProductComposer(request, response);
    },
  );

  routes.get(
    "/products",
    function (request, response, next) {
      authComposer(request, response, next);
    },
    function (request, response) {
      returnProductsComposer(request, response);
    },
  );

  return routes;
};
