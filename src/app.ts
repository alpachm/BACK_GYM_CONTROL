import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import AppError from "./utils/appError";
import globalHandlerError from "./controllers/error.controller";
import userRouter from "./routes/user.routes";

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

app.use("/api/v1/users", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(`The route ${req.originalUrl} was not found on this site`, 404)
  );
});

app.use(globalHandlerError);

export default app;
