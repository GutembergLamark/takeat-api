import { Router } from "express";
import { authComposer } from "../../composers/middlewares/auth.composer";
import { schemaComposer } from "../../composers/middlewares/schema.composer";
import { createProductSchema } from "../../shared/schemas/product.schema";
import { createProductComposer } from "../../composers/usecases/createProduct.composer";
import { returnProductsComposer } from "../../composers/usecases/returnProducts.composer";
import { createOrderSchema } from "../../shared/schemas/order.schema";
import { createOrderComposer } from "../../composers/usecases/createOrder.composer";
import { returnOrdersComposer } from "../../composers/usecases/returnOrders.composer";
import { restaurantByIdComposer } from "../../composers/usecases/restaurantById.composer";

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

  routes.get("/products/:id", function (request, response) {
    returnProductsComposer(request, response);
  });

  routes.get("/data/:id", function (request, response) {
    restaurantByIdComposer(request, response);
  });

  routes.post(
    "/orders",
    function (request, response, next) {
      schemaComposer(request, response, next, createOrderSchema);
    },
    function (request, response) {
      createOrderComposer(request, response);
    },
  );

  routes.get(
    "/orders",
    function (request, response, next) {
      authComposer(request, response, next);
    },
    function (request, response) {
      returnOrdersComposer(request, response);
    },
  );

  return routes;
};
