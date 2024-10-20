import express from "express";
import {protect} from "./../middlewares/authentication.middlewares";
import {validIfUserExist} from "./../middlewares/auth.middlewares";
import {createRoutine, deleteRoutine, findAllRoutineByFkUser, findRoutineByDay, unlinkDailykRoutine} from "./../controllers/routine.controller";
import {createRoutineValidations} from "./../validations/routine.validations";
import {validRoutineDay, validIfRoutineExist} from "./../middlewares/routine.middlewares";

const router = express.Router();

router.use(protect);

router.route("/")
    .post(createRoutineValidations, validRoutineDay, createRoutine)

router.get("/:userId", findAllRoutineByFkUser)

/**
 * @param id userId
 */
router.route("/:id/:dayId").get(validIfUserExist, findRoutineByDay)

router.route("/unlink/:id")
    .get(validIfRoutineExist, unlinkDailykRoutine)

router.delete("/delete/:id", validIfRoutineExist, deleteRoutine)

export default router;