import express from "express";
import {createExercise} from "./../controllers/exercise.controller";
import {createExerciseValidatins} from "./../validations/exercise.validations";
import {protect} from "./../middlewares/authentication.middlewares";

const router = express.Router();

router.use(protect);

router.route("")
    .post(createExerciseValidatins, createExercise)

export default router;