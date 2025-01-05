import { Express } from "express";
import { restaurantPublicRoutes } from "./restaurant/restaurant.public.routes";
import { sessionPublicRoutes } from "./session/session.routes";
import { restaurantRoutes } from "./restaurant/restaurant.routes";

const appRoutes = (app: Express) => {
  app.use("/public", restaurantPublicRoutes());
  app.use("/public", sessionPublicRoutes());
  app.use("/restaurant", restaurantRoutes());
};

export default appRoutes;
