import { Request, Response, NextFunction } from "express";
import { EnvConfig } from "../config/env";
import { JwtUtils } from "../utils/jwt";

export class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const payload = JwtUtils.verify(token, EnvConfig.get("JWT_SECRET"));
      req.user = payload; // Attach user info to request
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
}
