import passport, { use } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { EnvConfig } from "./env";

const userRepo = new UserRepository();
const authService = new AuthService();

passport.use(
  new GoogleStrategy(
    {
      clientID: EnvConfig.get("GOOGLE_CLIENT_ID"),
      clientSecret: EnvConfig.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: EnvConfig.get("GOOGLE_CALLBACK_URL"),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userRepo.findByGoogleId(profile.id);

        if (!user) {
          user = await userRepo.findByEmail(profile.emails?.[0].value || "");
          if (user) {
            // Update existing user with Google ID and profile info
            user = await userRepo.update(user.id, {
              googleId: profile.id,
              email: profile.emails?.[0].value || user.email,
              name: profile.displayName || user.name,
              picture: profile.photos?.[0].value || user.picture,
            });
          } else {
            // Create a new user if not found
            user = await userRepo.create({
              email: profile.emails?.[0].value || "",
              googleId: profile.id,
              name: profile.displayName || "",
              picture: profile.photos?.[0].value || "",
            });
          }
        }

        const tokens = authService.generateTokenForOAuth(user);

        return done(null, { user, tokens });
      } catch (error) {
        return done(error);
      }
    }
  )
);
