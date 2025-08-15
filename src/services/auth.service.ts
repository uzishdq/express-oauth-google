import { z } from "zod";
import bcrypt from "bcrypt";

import { UserRepository } from "../repositories/user.repository";
import { loginSchema, registerSchema } from "../utils/validation";
import { JwtUtils } from "../utils/jwt";
import { EnvConfig } from "../config/env";

export class AuthService {
  private userRepo = new UserRepository();

  public generateToken(user: { id: string; email: string }) {
    const payload = { userId: user.id, email: user.email };

    const accessToken = JwtUtils.sign(payload, EnvConfig.get("JWT_SECRET"), {
      expiresIn: "15m",
    });

    const refreshToken = JwtUtils.sign(
      payload,
      EnvConfig.get("JWT_REFRESH_SECRET"),
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken, user };
  }

  async register(data: z.infer<typeof registerSchema>) {
    const parse = registerSchema.safeParse(data);

    if (!parse.success) throw new Error("validation error");

    const { email, password } = parse.data;

    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) throw new Error("User already exists");

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepo.create({
      email,
      password: hasedPassword,
    });

    return this.generateToken(user);
  }

  async login(data: z.infer<typeof loginSchema>) {
    const parse = loginSchema.safeParse(data);

    if (!parse.success) throw new Error("validation error");

    const { email, password } = parse.data;

    const user = await this.userRepo.findByEmail(email);

    if (!user || !(await bcrypt.compare(data.password, user.password || ""))) {
      throw new Error("Invalid credentials");
    }

    return this.generateToken(user);
  }

  async refreshToken(token: string) {
    try {
      const payload = JwtUtils.verify(
        token,
        EnvConfig.get("JWT_REFRESH_SECRET")
      ) as { email: string; userId: string };

      const user = await this.userRepo.findByEmail(payload.email);

      if (!user) throw new Error("Invalid Token");

      return this.generateToken(user);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
}
