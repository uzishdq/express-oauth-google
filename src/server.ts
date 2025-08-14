import express from "express";
import { EnvConfig } from "./config/env";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import passport from "passport";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = parseInt(EnvConfig.get("PORT", "6969"));

app.use(helmet());
app.use(
  cors({
    origin: EnvConfig.get("ORIGIN_URL"),
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(passport.initialize());

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(
    `Server is running on ${PORT} in ${EnvConfig.get("NODE_ENV")} mode`
  );
});
