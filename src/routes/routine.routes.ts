import express from "express";
import {protect} from "./../middlewares/authentication.middlewares";
import {createRoutine, deleteRoutine, findAllRoutineByFkUser} from "./../controllers/routine.controller";
import {createRoutineValidations} from "./../validations/routine.validations";
import {validRoutineDay, validIfRoutineExist} from "./../middlewares/routine.middlewares";

const router = express.Router();

router.use(protect);

router.route("/")
    .post(createRoutineValidations, validRoutineDay, createRoutine)

router.get("/:userId", findAllRoutineByFkUser)

router.delete("/delete/:id", validIfRoutineExist, deleteRoutine)

export default router;