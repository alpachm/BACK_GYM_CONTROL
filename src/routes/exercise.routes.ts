import express from "express";
import {createExercise, findExercisesPerUser, findExerciseById} from "./../controllers/exercise.controller";
import {createExerciseValidations} from "./../validations/exercise.validations";
import {protect} from "./../middlewares/authentication.middlewares";
import {validIfUserExist} from "./../middlewares/auth.middlewares";
import {validIfExerciseExist} from "./../middlewares/exercise.middlewares";

const router = express.Router();

router.use(protect);

router.route("/")
    .post(createExerciseValidations, createExercise)

router.route("/:id")
    .get(validIfExerciseExist, findExerciseById)

router.get("/getAllExercise/:id", validIfUserExist, findExercisesPerUser)

export default router;