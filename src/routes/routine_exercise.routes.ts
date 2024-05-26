import express from "express";
import {protect} from "./../middlewares/authentication.middlewares";
import {createRelationBetweenRoutineExerciseValidations} from "./../validations/routine_exercise.validations";
import {createRelationForRoutineExercise, deleteRelationForRoutineExercise} from "./../controllers/routine_exercise.controller";

const router = express.Router();

router.use(protect);

router.route("/")
    .post(createRelationBetweenRoutineExerciseValidations, createRelationForRoutineExercise)

router.delete("/unlink-exercise/:routineId/:exerciseId", deleteRelationForRoutineExercise)

export default router;