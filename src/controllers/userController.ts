import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const updateUserSchema = createUserSchema.partial();

export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.json({ data: users });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ data: user });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createUserSchema.parse(req.body);
      const user = await userService.create(parsed);
      res.status(201).json({ data: user });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateUserSchema.parse(req.body);
      const user = await userService.update(req.params.id, parsed);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ data: user });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.remove(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
