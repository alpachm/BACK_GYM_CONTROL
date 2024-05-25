import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import AppError from "./utils/appError";
import globalHandlerError from "./controllers/error.controller";
import authRoutes from "./routes/auth.routes";
import routineRoutes from "./routes/routine.routes";
import dayRoutes from "./routes/day.routes";

const app: Application = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again in one hour",
});

app.use(express.json());
app.use(helmet());
app.use(hpp());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1", limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/routine", routineRoutes);
app.use("/api/v1/day", dayRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(`The route ${req.originalUrl} was not found on this site`, 404)
  );
});

app.use(globalHandlerError);

export default app;
