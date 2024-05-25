import express from "express";
import {createExercise, findExercisesPerUser} from "./../controllers/exercise.controller";
import {createExerciseValidations} from "./../validations/exercise.validations";
import {protect} from "./../middlewares/authentication.middlewares";
import {validIfUserExist} from "./../middlewares/auth.middlewares";

const router = express.Router();

router.use(protect);

router.route("/")
    .post(createExerciseValidations, createExercise)

router.route("/:id")
    .get(validIfUserExist, findExercisesPerUser)

export default router;