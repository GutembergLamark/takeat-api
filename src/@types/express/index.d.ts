import * as express from "express";

declare global {
  namespace Express {
    export interface Request {
      validatedBody: object;
      restaurant: {
        id: string;
        email: string;
      };
    }
  }
}
