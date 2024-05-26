import express from "express";
import {createExercise, findExercisesPerUser, findExerciseById, softDeleteExercise, createExerciseFromRoutine} from "./../controllers/exercise.controller";
import {createExerciseValidations} from "./../validations/exercise.validations";
import {protect} from "./../middlewares/authentication.middlewares";
import {validIfUserExist} from "./../middlewares/auth.middlewares";
import {validIfExerciseExist, validIfUserExistFromExercise} from "./../middlewares/exercise.middlewares";

const router = express.Router();

router.use(protect);

router.route("/")
    .post(createExerciseValidations, validIfUserExistFromExercise, createExercise)

router.route("/:id")
    .get(validIfExerciseExist, findExerciseById)
    .delete(validIfExerciseExist, softDeleteExercise)

router.get("/getAllExercise/:id", validIfUserExist, findExercisesPerUser)

router.post("/create-exercise-from-routine/:routineId", createExerciseValidations, validIfUserExistFromExercise, createExerciseFromRoutine)

export default router;