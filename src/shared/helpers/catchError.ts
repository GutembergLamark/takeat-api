import { Response } from "express";
import { AppError } from "../errors/AppError";

export function catchError(
  error: AppError | Error | any,
  response: Response,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof Error) {
    return response.status(400).json({ message: error.message });
  }

  return response.status(500).json({ message: "Internal server error" });
}
