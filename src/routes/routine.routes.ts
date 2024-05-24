import express from "express";
import {protect} from "./../middlewares/authentication.middlewares";
import {createRoutine} from "./../controllers/routine.controller";
import {createRoutineValidations} from "./../validations/routine.validations";

const router = express.Router();

router.use(protect);

router.route("/")
    .post(createRoutineValidations, createRoutine)

export default router;