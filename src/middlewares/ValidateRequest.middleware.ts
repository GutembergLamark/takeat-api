import { NextFunction, Request, Response } from "express";
import { Schema } from "yup";

export default class ValidateRequest {
  constructor(private readonly schema: Schema<any>) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      try {
        const validatedBody = await this.schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validatedBody = validatedBody;

        return next();
      } catch (e: any) {
        return res.status(400).json({
          error: e.errors?.join(", "),
        });
      }
    } catch (e) {
      return next(e);
    }
  }
}
