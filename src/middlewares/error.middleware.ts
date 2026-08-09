import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  const message = error.message || "Internal server error";

  const status =
    message === "User not found" ? 404 :
    message === "Email already exists" ? 409 :
    message === "Email is required" || message === "Name is required" ? 400 :
    500;

  res.status(status).json({ message });
}
