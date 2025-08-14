import express from "express";
import { AuthController } from "../controllers/auth.controller";
import passport from "passport";

const router = express.Router();
const authController = new AuthController();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/refresh", (req, res) => authController.refresh(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: any, res) => {
    const { accessToken, refreshToken, user } = req.user.tokens;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    // Redirect to frontend with accessToken, e.g., res.redirect(`http://localhost:3001?token=${accessToken}`);
    res.json({ accessToken, user });
  }
);

export default router;
