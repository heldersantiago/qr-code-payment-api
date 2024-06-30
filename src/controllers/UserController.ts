import { Request, Response } from "express";
import UserService from "../services/UserService";
import { User } from "../models/user";

export class UserController {
  public getUsers(req: Request, res: Response) {
    const users = User.findAll({ limit: 100 });
    res.status(200).json(users);
  }
  public async createUser(req: Request, res: Response) {
    const newUser = req.body;
    try {
      const createdUser = await UserService.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  public async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  public async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // await UserService.updateUser(updatedUser);
      res.status(200).json(user);
    } catch (error) {
      res.status(200).json({ error: error });
    }
  }
  public async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await UserService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
