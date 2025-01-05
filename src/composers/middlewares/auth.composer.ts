import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../middlewares/Auth.middleware";

export function authComposer(req: Request, res: Response, next: NextFunction) {
  const auth = new AuthService(req, res, next);

  auth.execute();
}
