import { NextFunction, Request, Response } from "express";
import ValidateRequest from "../../middlewares/ValidateRequest.middleware";
import { Schema } from "yup";

export async function schemaComposer(
  request: Request,
  response: Response,
  next: NextFunction,
  schema: Schema<any>,
) {
  const validator = new ValidateRequest(schema);
  validator.execute(request, response, next);
}
