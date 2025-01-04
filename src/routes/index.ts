import { Express } from "express";
import { restaurantPublicRoutes } from "./restaurant/restaurant.public.routes";

const appRoutes = (app: Express) => {
  app.use("/public", restaurantPublicRoutes());
};

export default appRoutes;
