import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response) {
    try {
      const result = await this.authService.register(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.json({ accessToken: result.accessToken, user: result.user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.authService.login(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.json({ accessToken: result.accessToken, user: result.user });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No token" });
    try {
      const { accessToken, refreshToken: newRefresh } =
        await this.authService.refreshToken(refreshToken);
      res.cookie("refreshToken", newRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.json({ accessToken });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  }
}
