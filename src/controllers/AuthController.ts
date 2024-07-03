import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from "path";
import { User } from "../models/user";

const envPATH = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPATH });

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ errors: "Missing email or password" });
      }

      const user = await User.findOne<User>({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(401).json({ errors: "Invalid credentials" });
      }

      const isPasswordMatched = user.password === password;
      if (!isPasswordMatched) {
        return res.status(401).json({ errors: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        String(process.env.JWT_SECRET_KEY),
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
