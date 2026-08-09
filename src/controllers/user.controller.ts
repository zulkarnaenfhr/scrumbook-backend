import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await userService.getUsers());
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await userService.getUserById(req.params.id));
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(await userService.createUser(req.body));
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await userService.updateUser(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await userService.deleteUser(req.params.id));
  } catch (error) {
    next(error);
  }
}
