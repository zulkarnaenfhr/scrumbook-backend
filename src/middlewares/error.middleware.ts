import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error("Unhandled request error", {
    method: req.method,
    path: req.originalUrl,
    message: error.message,
    stack: error.stack,
  });

  const message = error.message || "Internal server error";

  const status =
    message === "User not found" ? 404 :
    message === "Email already exists" ? 409 :
    message === "Email is required" || message === "Name is required" ? 400 :
    500;

  res.status(status).json({ message });
}
