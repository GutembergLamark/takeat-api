import { Router } from "express";
import { schemaComposer } from "../../composers/middlewares/schema.composer";
import { createSessionSchema } from "../../shared/schemas/session.schema";
import { createSessionComposer } from "../../composers/usecases/createSession.composer";

const routes = Router();

export const sessionPublicRoutes = function () {
  routes.post(
    "/login",
    function (request, response, next) {
      schemaComposer(request, response, next, createSessionSchema);
    },
    function (request, response) {
      createSessionComposer(request, response);
    },
  );

  return routes;
};
