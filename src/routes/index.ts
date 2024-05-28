import express from "express";
import authRoutes from "./auth.routes";
import routineRoutes from "./routine.routes";
import dayRoutes from "./day.routes";
import exerciseRoutes from "./exercise.routes";
import routine_exerciseRoutes from "./routine_exercise.routes";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/routine", routineRoutes);
router.use("/api/v1/day", dayRoutes);
router.use("/api/v1/exercise", exerciseRoutes);
router.use("/api/v1/routine-exercise", routine_exerciseRoutes);

export default router;