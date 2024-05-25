import express from "express";
import {findRoutinePerDay} from "./../controllers/day.controller";
import {protect} from "./../middlewares/authentication.middlewares";

const router = express.Router();

router.use(protect);

router.get("/:dayId/:userId", findRoutinePerDay);


export default router;